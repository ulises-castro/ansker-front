<template>
  <div  class="publish-container overflow-hidden" ref="container">

    <div class="header-buttons ">
      <div  v-if="showDoneButton" class="row justify-between">
        <van-button
          @click="updateTextAreaValue"
          size="small" plain type="primary button shadow-2 text-shadow-1">
          Cancel
        </van-button>

        <div class="row items-center text-weight-bold text-white text-shadow-1">
          <span>
            {{ textareaLength }} / 180
          </span>
        </div>

        <van-button
          @click="updateTextAreaValue(true)"
          size="small" plain type="primary button shadow-2 text-shadow-1">
          Done
        </van-button>
      </div>
      <div class="row reverse" v-else>
        <van-button
          @click="updateTextAreaValue(true)"
          size="small" plain type="primary button shadow-2 text-shadow-1">
          Publicar
        </van-button>
      </div>
    </div>

    <cropper
      ref="canvas"
      placeholder=""
      v-model="croppa"
      :quality="2"
      :zoom-speed="10"
      :textarea="textarea"
      :width="screen.width"
      :height="screen.height"
      :disable-rotation="true"
      :show-remove-button="false"
      :prevent-white-space="true"
      :disable-click-choose="true"
      canvas-color="transparent"
      :initial-image="imageSelected"
      @file-choose="alert('file choose')"
      @file-size-exceed="alert('file size exceeds')"
      @file-type-mismatch="alert('file type mismatches')"
      @new-image="alert('new image attatched')"
      @image-remove="removeBackgroundImage"
      @loading-start="isLoading = true"
      @loading-end="isLoading = false"
      @zoom="updateBackgroundImage"
      @move="updateBackgroundImage"></cropper>

    <div class="texteditor-container row full-width"
      @mousedown.stop.prevent="croppa._handlePointerStart"
      @mouseup.stop.prevent="croppa._handlePointerEnd"
      @touchstart.stop="croppa._handlePointerStart"
      @pointerstart.stop.prevent="croppa._handlePointerStart"
      @touchend.stop.prevent="croppa._handlePointerEnd"
      @touchcancel.stop.prevent="croppa._handlePointerEnd"
      @pointerend.stop.prevent="croppa._handlePointerEnd"
      @pointercancel.stop.prevent="croppa._handlePointerEnd"
      @touchmove.stop="croppa._handlePointerMove"
      @mousemove.stop.prevent="croppa._handlePointerMove"
      @DOMMouseScroll.stop="croppa._handleWheel"
      @wheel.stop="croppa._handleWheel"
      @mousewheel.stop="croppa._handleWhel">
      <div class="col-12 textarea-container" style="z-index: 100">
        <textarea
          class="text-shadow-1"
          ref="textarea"
          @focus="showDoneButton = true"
          maxlength="180"
          minlength="10"
          v-model="textarea.value"
          placeholder="Escribe aqui..."
          id="story"
          name="story">
        </textarea>
      </div>
    </div>

    <van-popup
      v-model="showBackgroundOptions"
      overlay-class="overlay-transparent"
      round
      position="bottom" :style="{ height: '30%' }">
      <div class="full-width q-pa-md text-center">
        <b>Seleccionar color de fondo</b>
      </div>
      <div v-for="bgColor in backgroundColors" :key="bgColor" style="height: 50%">
        <div @click="updateBackgroudColor(bgColor)" class="row fit" :style="`background: ${bgColor}`"></div>
      </div>
    </van-popup>

    <div ref="toolbar" v-if="!showDoneButton" class="toolbar">
      <div class="row justify-around fit items-center text-shadow-2">
        <q-icon @click="croppa.chooseFile()" name="las la-camera" color="white" class="q-mr-sm" size="30px" />

        <q-icon @click="showBackgroundOptions = true" name="las la-palette" color="white" class="q-mr-sm" size="30px"/>

        <q-icon @click="changeFontFamily" name="las la-font" color="white" class="q-mr-sm" size="35px" />

        <q-icon @click="toggleFontBold" name="fas fa-bold" color="white" class="q-mr-sm" size="25px" />

        <q-icon @click="restoreCanvas" name="las la-redo-alt" color="white" class="q-mr-sm" size="30px" />
      </div>
    </div>

  </div>
</template>

<script>
import Cropper from 'src/components/cropper'
import EventBus from 'src/eventBus.js'

const initialTextArea = {
  fontFamily: 'Lato',
  fontWeight: '',
  fontSize: 20,
  color: '#FFF',
  oldValue: '',
  value: '',
}

const initialData = {
  textarea: initialTextArea,
  prevCanvasStack: {
    textarea: [{ ...initialTextArea }],
  },
}

export default {
  name: 'Publish',
  components: { Cropper },
  data() {
    return {
      ...initialData,
      showBackgroundOptions: false,
      editText: false,
      backgroundColor: '',
      showDoneButton: false,
      croppa: {},
      imageSelected: '/statics/wallpaper.jpg',
      canvasPrevState: false,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      showEditor: {
        fontFamily: false,
        fontColor: !false,
      },
      backgroundColors: [
        '#0e5181', '#028f92', '#c7ac0f', '#E8045A', '#B2028A',
      ],
      editorOptions: {
        fontFamilies: [
          'Arial',
          'sans-serif',
          'Lato',
          'Helvetica'],
      },
    }
  },
  computed: {
    textareaLength() {
      return this.textarea.value.length
    }
  },
  methods: {
    _handlePointerStart(evt) {
      const canvas = this.$refs.canvas
      console.log(canvas, this.croppa)
    },

    removeBackgroundImage() {
      // this.background = ''
    },

    afterReadImage(image) {
      console.log(image)
      this.imageSelected = image.content
      this.croppa.refresh()
    },

    updateBackgroudColor(color) {
      this.imageSelected = ''

      this.backgroundColor = color
      this.$refs.canvas.$el.style.backgroundColor = color
      this.croppa.refresh()
    },

    handlerFontColor(color) {
      this.textarea.color = color;
    },

    changeFontFamily() {
    },

    toggleFontBold() {
      this.textarea.fontWeight = (!this.textarea.fontWeight) ? 'bold' : ''
    },

    restoreCanvas() {
      const keys = Object.keys(initialData)
      keys.forEach((key) => this[key] = initialData[key]);
    },

    updateTextAreaValue(update = false) {
      this.showDoneButton = false

      if (update)
        this.textarea.oldValue = this.textarea.value
      else
        this.textarea.value = this.textarea.oldValue
    },

    updateBackgroundImage() {

    },

    _updatePrevCanvas() {
       this.prevCanvasStack.textarea.push({...this.textarea})
    }
  },
  watch: {
    textarea: {
      handler(textarea) {
        this.$refs.textarea.style.fontSize = `${textarea.fontSize}px`

        this.$refs.textarea.style.fontWeight = `${textarea.fontWeight}`
      },
      deep: true,
    },
  },
  created() {
    EventBus.$emit('toggleUI', false)
  },
  mounted() {
    // console.log(this.$refs.can)
  }
}
</script>

<style lang="scss" scoped>

.publish-container {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

.header-buttons {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  top: 15px;
  z-index: 10;

  .button {
    background: transparent;
    color: white;
    border: 2px solid white;
    font-weight: bold;
  }
}

.van-tabbar--fixed {
  display: none !important;
}

.color-container {
  border-radius: 50%;
}

.toolbar {
  position: absolute;
  width: 100%;
  padding: 5px;
  height: 60px;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.4);
}

span.arial {
  font-family: Arial !important;
}

.helvetica {
  font-family: Helvetica;
}

.sans-serif {
  font-family: sans-serif;
}

.texteditor-container {
  position: absolute;
  top: 35vh;
}

.textarea-container {
  height: 40vh;
  color: white;
  font-size: 20px;

  & textarea {
    width: 100%;
    resize: none;
    height: 100%;
    background: transparent;
    border: 2px solid rgba($color: #000000, $alpha: 1.0);

    &::placeholder {
      color: white;
      opacity: 0.7;
    }
  }
}

.control {

  &-font-size {
    z-index: 10;
  }

  &-font-colors {
    position: absolute;
    display: flex;
    bottom: 80px;

    .color-container {
      display: block;
      height: 25px;
      width: 25px;
      margin-right: 1em;

      div {
        height: 100%;
        width: 100%;
        border: 2px solid white;
        border-radius: 50%;
      }
    }
  }
}

</style>