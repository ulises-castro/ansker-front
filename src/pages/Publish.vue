<template>
  <div  class="publish-container" ref="container">

    <div class="textarea-container" style="z-index: 100">
      <textarea
        ref="textarea"
        @focus="showDoneButton = true"
        maxlength="180"
        minlength="10"
        :value="textarea.value"
        placeholder="Escribe"
        id="story"
        name="story">
      </textarea>
    </div>

    <div class="header-buttons row justify-between">
      <van-button
        v-if="showDoneButton"
        @click="updateTextAreaValue"
        size="small" plain type="primary button">
        Cancel
      </van-button>

      <van-button
        v-if="showDoneButton"
        @click="updateTextAreaValue"
        size="small" plain type="primary button">
        Done
      </van-button>

    </div>

    <cropper
      ref="can"
      v-model="imageSelected"
      :width="this.screen.width"
      :height="this.screen.height"
      :quality="2"
      :zoom-speed="10"
      :disable-rotation="true"
      :show-remove-button="false"
      :prevent-white-space="true"
      initial-image="/statics/wallpaper.jpg"
      placeholder="Seleccionar imagén"
      :textarea="textarea"
      @file-choose="alert('file choose')"
      @file-size-exceed="alert('file size exceeds')"
      @file-type-mismatch="alert('file type mismatches')"
      @new-image="alert('new image attatched')"
      @image-remove="removeBackgroundImage"
      @loading-start="isLoading = true"
      @loading-end="isLoading = false"
      @new-image-drawn="updateBackgroundImage"
      @zoom="updateBackgroundImage"
      @move="updateBackgroundImage"></cropper>

    <div class="shadow-5 control-font-size" :style="{ height: '130px' }">
      <van-slider
      active-color="#fff"
      button-size="22px"
      :max="40"
      :min="18"
      v-model="textarea.fontSize" vertical />
    </div>
    <div ref="toolbar" v-if="!showDoneButton" class="toolbar row justify-around">
      <q-icon @click="changeFontFamily" name="las la-font" color="white" class="q-mr-sm" size="30px" />
      <q-icon @click="toggleFontBold" name="las la-bold" color="white" class="q-mr-sm" size="30px" />
      <q-icon @click="restoreCanvas" name="las la-redo-alt" color="white" class="q-mr-sm" size="30px" />
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
  value: 'as',
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
      showDoneButton: false,
      imageSelected: {},
      canvasPrevState: false,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      showEditor: {
        fontFamily: false,
        fontColor: !false,
      },
      editorOptions: {
        fontFamilies: [
          'Arial',
          'sans-serif',
          'Lato',
          'Helvetica'],
      },
    }
  },
  methods: {
    removeBackgroundImage() {
      // this.background = ''
    },

    updateBackgroundImage() {
      // this.$refs.publishArea.blur();

      // this.background =
      //   this.imageSelected.generateDataUrl('image/jpeg', 0.8);

      // setTimeout(() => this.drawTextInImage(), 500);
    },

    restoreCanvas() {
      const keys = Object.keys(initialData)
      keys.forEach((key) => this[key] = initialData[key]);
    },

    handlerFontColor(color) {
      this.textarea.color = color;
    },

    changeFontFamily() {
    },

    toggleFontBold() {
      this.textarea.fontWeight = (!this.textarea.fontWeight) ? 'bold' : ''
    },

    updateTextAreaValue() {
      this.showDoneButton = false
      this.textarea.value = this.$refs.textarea.value
      // console.log()
      // this.$refs.textarea
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

.textarea-container {
  position: absolute;
  top: calc(50vh - 80px);
  left: calc(50vw - 100px);
  width: 250px;
  height: 100px;
  color: white;
  font-size: 20px;

  & textarea {
    width: 100%;
    resize: none;
    height: 100%;
    background: transparent;
    border: 2px solid rgba($color: #000000, $alpha: 1.0);
  }
}

.header-buttons {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;

  .button {
    background: transparent;
    color: white;
    border: 1px solid white;
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
  bottom: 100px;
  background: rgba(255, 255, 255, 0.5);
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

.control {
  &-font-size {
    position: absolute;
    top: calc((100vh / 2) - 100px) ;
    left: 30px;
    z-index: 10;
  }

  &-font-colors {
    position: absolute;
    display: flex;
    bottom: 50px;

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