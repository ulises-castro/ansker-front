<template>
  <div ref="wrapper"
    :class="`croppa-container ${img ? 'croppa--has-target' : ''} ${passive ? 'croppa--passive' : ''} ${disabled ? 'croppa--disabled' : ''} ${disableClickChoose ? 'croppa--disabled-cc' : ''} ${disableDragToMove && disableScrollToZoom ? 'croppa--disabled-mz' : ''} ${fileDraggedOver ? 'croppa--dropzone' : ''}`"
    @dragenter.stop.prevent="_handleDragEnter"
    @dragleave.stop.prevent="_handleDragLeave"
    @dragover.stop.prevent="_handleDragOver"
    @drop.stop.prevent="_handleDrop">
    <input type="file"
      :accept="accept"
      :disabled="disabled"
      v-bind="inputAttrs"
      ref="fileInput"
      @change="_handleInputChange"
      style="height:1px;width:1px;overflow:hidden;margin-left:-99999px;position:absolute;" />
    <div class="slots"
      style="width: 0; height: 0; visibility: hidden;">
      <slot name="initial"></slot>
      <slot name="placeholder"></slot>
    </div>

    <canvas ref="canvas"
      @click.stop.prevent="_handleClick"
      @dblclick.stop.prevent="_handleDblClick"
      @touchstart.stop="_handlePointerStart"
      @mousedown.stop.prevent="_handlePointerStart"
      @pointerstart.stop.prevent="_handlePointerStart"
      @touchend.stop.prevent="_handlePointerEnd"
      @touchcancel.stop.prevent="_handlePointerEnd"
      @mouseup.stop.prevent="_handlePointerEnd"
      @pointerend.stop.prevent="_handlePointerEnd"
      @pointercancel.stop.prevent="_handlePointerEnd"
      @touchmove.stop="_handlePointerMove"
      @mousemove.stop.prevent="_handlePointerMove"
      @pointermove.stop.prevent="_handlePointerMove"
      @pointerleave.stop.prevent="_handlePointerLeave"
      @DOMMouseScroll.stop="_handleWheel"
      @wheel.stop="_handleWheel"
      @mousewheel.stop="_handleWheel"></canvas>
    <svg class="icon icon-remove"
      v-if="showRemoveButton && img && !passive"
      @click="remove"
      :style="`top: -${height/40}px; right: -${width/40}px`"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="removeButtonSize || width/10"
      :height="removeButtonSize || width/10">
      <path d="M511.921231 0C229.179077 0 0 229.257846 0 512 0 794.702769 229.179077 1024 511.921231 1024 794.781538 1024 1024 794.702769 1024 512 1024 229.257846 794.781538 0 511.921231 0ZM732.041846 650.633846 650.515692 732.081231C650.515692 732.081231 521.491692 593.683692 511.881846 593.683692 502.429538 593.683692 373.366154 732.081231 373.366154 732.081231L291.761231 650.633846C291.761231 650.633846 430.316308 523.500308 430.316308 512.196923 430.316308 500.696615 291.761231 373.523692 291.761231 373.523692L373.366154 291.918769C373.366154 291.918769 503.453538 430.395077 511.881846 430.395077 520.349538 430.395077 650.515692 291.918769 650.515692 291.918769L732.041846 373.523692C732.041846 373.523692 593.447385 502.547692 593.447385 512.196923 593.447385 521.412923 732.041846 650.633846 732.041846 650.633846Z"
        :fill="removeButtonColor"></path>
    </svg>
    <div class="sk-fading-circle"
      :style="loadingStyle"
      v-if="showLoading && loading">
      <div :class="`sk-circle${i} sk-circle`"
        v-for="i in 12"
        :key="i">
        <div class="sk-circle-indicator"
          :style="{backgroundColor: loadingColor}"></div>
      </div>
    </div>
    <slot></slot>

  </div>
</template>

<script>
import u from './util'
import props from './props'
import events from './events'

const PCT_PER_ZOOM = 1 / 100000 // The amount of zooming everytime it happens, in percentage of image width.
const MIN_MS_PER_CLICK = 500 // If touch duration is shorter than the value, then it is considered as a click.
const CLICK_MOVE_THRESHOLD = 100 // If touch move distance is greater than this value, then it will by no mean be considered as a click.
const MIN_WIDTH = 10 // The minimal width the user can zoom to.
const DEFAULT_PLACEHOLDER_TAKEUP = 2 / 3 // Placeholder text by default takes up this amount of times of canvas width.
const PINCH_ACCELERATION = 1 // The amount of times by which the pinching is more sensitive than the scolling

// Create a file and import
const syncData = ['imgData', 'img', 'imgSet', 'originalImage', 'naturalHeight', 'naturalWidth', 'orientation', 'scaleRatio']
// const DEBUG = false

import methods from './methods.js'

export default {
  // name: 'cropper',
  model: {
    prop: 'value',
    event: events.INIT_EVENT
  },

  props: props,

  data () {
    return {
      canvas: null,
      ctx: null,
      originalImage: null,
      img: null,
      video: null,
      dragging: false,
      lastMovingCoord: null,
      imgData: {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0
      },
      fileDraggedOver: false,
      tabStart: 0,
      scrolling: false,
      pinching: false,
      rotating: false,
      pinchDistance: 0,
      supportTouch: false,
      pointerMoved: false,
      pointerStartCoord: null,
      naturalWidth: 0,
      naturalHeight: 0,
      scaleRatio: null,
      orientation: 1,
      userMetadata: null,
      imageSet: false,
      currentPointerCoord: null,
      currentIsInitial: false,
      loading: false,
      realWidth: 0, // only for when autoSizing is on
      realHeight: 0, // only for when autoSizing is on
      chosenFile: null,
      useAutoSizing: false,
    }
  },

  computed: {
    outputWidth () {
      const w = this.useAutoSizing ? this.realWidth : this.width
      return w * this.quality
    },

    outputHeight () {
      const h = this.useAutoSizing ? this.realHeight : this.height
      return h * this.quality
    },

    computedPlaceholderFontSize () {
      return this.placeholderFontSize * this.quality
    },

    aspectRatio () {
      return this.naturalWidth / this.naturalHeight
    },

    loadingStyle () {
      return {
        width: this.loadingSize + 'px',
        height: this.loadingSize + 'px',
        right: '15px',
        bottom: '10px'
      }
    },
  },

  mounted () {
    this._initialize()
    u.rAFPolyfill()
    u.toBlobPolyfill()

    let supports = this.supportDetection()
    if (!supports.basic) {
      console.warn('Your browser does not support vue-croppa functionality.')
    }

    if (this.passive) {
      this.$watch('value._data', (data) => {
        let set = false
        if (!data) return
        for (let key in data) {
          if (syncData.indexOf(key) >= 0) {
            let val = data[key]
            if (val !== this[key]) {
              this.$set(this, key, val)
              set = true
            }
          }
        }
        if (set) {
          if (!this.img) {
            this.remove()
          } else {
            this.$nextTick(() => {
              this._draw()
            })
          }
        }
      }, {
          deep: true
        })
    }

    this.useAutoSizing = !!(this.autoSizing && this.$refs.wrapper && getComputedStyle)
    if (this.useAutoSizing) {
      this._autoSizingInit()
    }
  },

  beforeDestroy () {
    if (this.useAutoSizing) {
      this._autoSizingRemove()
    }
  },

  watch: {
    outputWidth: function () {
      this.onDimensionChange()
    },
    outputHeight: function () {
      this.onDimensionChange()
    },
    canvasColor: function () {
      if (!this.img) {
        this._setPlaceholders()
      } else {
        this._draw()
      }
    },
    imageBorderRadius: function () {
      if (this.img) {
        this._draw()
      }
    },
    placeholder: function () {
      if (!this.img) {
        this._setPlaceholders()
      }
    },
    placeholderColor: function () {
      if (!this.img) {
        this._setPlaceholders()
      }
    },
    computedPlaceholderFontSize: function () {
      if (!this.img) {
        this._setPlaceholders()
      }
    },
    preventWhiteSpace (val) {
      if (val) {
        this.imageSet = false
      }
      this._placeImage()
    },
    scaleRatio (val, oldVal) {
      if (this.passive) return
      if (!this.img) return
      if (!u.numberValid(val)) return

      var x = 1
      if (u.numberValid(oldVal) && oldVal !== 0) {
        x = val / oldVal
      }
      var pos = this.currentPointerCoord || {
        x: this.imgData.startX + this.imgData.width / 2,
        y: this.imgData.startY + this.imgData.height / 2
      }
      this.imgData.width = this.naturalWidth * val
      this.imgData.height = this.naturalHeight * val

      if (!this.userMetadata && this.imageSet && !this.rotating) {
        let offsetX = (x - 1) * (pos.x - this.imgData.startX)
        let offsetY = (x - 1) * (pos.y - this.imgData.startY)
        this.imgData.startX = this.imgData.startX - offsetX
        this.imgData.startY = this.imgData.startY - offsetY
      }

      if (this.preventWhiteSpace) {
        this._preventZoomingToWhiteSpace()
        this._preventMovingToWhiteSpace()
      }
    },
    'imgData.width': function (val, oldVal) {
      // if (this.passive) return
      if (!u.numberValid(val)) return
      this.scaleRatio = val / this.naturalWidth
      if (this.hasImage()) {
        if (Math.abs(val - oldVal) > (val * (1 / 100000))) {
          this.emitEvent(events.ZOOM_EVENT)
          this._draw()
        }
      }
    },
    'imgData.height': function (val) {
      // if (this.passive) return
      if (!u.numberValid(val)) return
      this.scaleRatio = val / this.naturalHeight
    },
    'imgData.startX': function (val) {
      // if (this.passive) return
      if (this.hasImage()) {
        this.$nextTick(this._draw)
      }
    },
    'imgData.startY': function (val) {
      // if (this.passive) return
      if (this.hasImage()) {
        this.$nextTick(this._draw)
      }
    },
    loading (val) {
      if (this.passive) return
      if (val) {
        this.emitEvent(events.LOADING_START_EVENT)
      } else {
        this.emitEvent(events.LOADING_END_EVENT)
      }
    },
    autoSizing (val) {
      this.useAutoSizing = !!(this.autoSizing && this.$refs.wrapper && getComputedStyle)
      if (val) {
        this._autoSizingInit()
      } else {
        this._autoSizingRemove()
      }
    }
  },
  methods
}
</script>

<style lang="scss">
.croppa-container {
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  font-size: 0;
  align-self: flex-start;
  background-color: #e6e6e6;

  canvas {
    transition: all 0.3s;
  }

  &:hover {
    opacity: 0.7;
  }

  &.croppa--dropzone {
    box-shadow: inset 0 0 10px #333;

    canvas {
      opacity: 0.5;
    }
  }

  &.croppa--disabled-cc {
    cursor: default;

    &:hover {
      opacity: 1;
    }
  }

  &.croppa--has-target {
    cursor: move;

    &:hover {
      opacity: 1;
    }

    &.croppa--disabled-mz {
      cursor: default;
    }
  }

  &.croppa--disabled {
    cursor: not-allowed;

    &:hover {
      opacity: 1;
    }
  }

  &.croppa--passive {
    cursor: default;

    &:hover {
      opacity: 1;
    }
  }

  svg.icon-remove {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    filter: drop-shadow((-2px) 2px 2px rgba(0, 0, 0, 0.7));
    z-index: 10;
    cursor: pointer;
    border: 2px solid #fff;
  }
}
</style>

<style lang="scss">
// https://github.com/tobiasahlin/SpinKit/blob/master/scss/spinners/10-fading-circle.scss

.sk-fading-circle {
  $circleCount: 12;
  $animationDuration: 1s;

  position: absolute;

  .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sk-circle .sk-circle-indicator {
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    border-radius: 100%;
    animation: sk-circleFadeDelay $animationDuration infinite ease-in-out both;
  }

  @for $i from 2 through $circleCount {
    .sk-circle#{$i} {
      transform: rotate(360deg / $circleCount * ($i - 1));
    }
  }

  @for $i from 2 through $circleCount {
    .sk-circle#{$i} .sk-circle-indicator {
      animation-delay: -$animationDuration + $animationDuration / $circleCount * ($i - 1);
    }
  }
}
@keyframes sk-circleFadeDelay {
  0%,
  39%,
  100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}
</style>

