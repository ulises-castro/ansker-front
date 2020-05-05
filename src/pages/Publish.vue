<template>
  <div  class="publish-container" ref="container">
    <cropper
      ref="can"
      v-model="imageSelected"
      :width="this.screen.width"
      :height="this.screen.height"
      :quality="1"
      :zoom-speed="10"
      :disable-rotation="true"
      :show-remove-button="!false"
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
      :active-color="textarea.color"
      button-size="22px"
      :max="40"
      :min="18"
      v-model="textarea.fontSize" vertical />
    </div>
    <div class="toolbar row justify-around">
      <div class="control-font-colors" v-if="showEditor.fontColor">
        <div
          class="color-container"
          v-for="(color, index) in editorOptions.fontColors"
          :key="index" @click="textarea.color = color">
          <div class="" :style="{'cursor': 'pointer', 'background-color': color}">
          </div>
        </div>
      </div>

      <q-icon @click="changeFontFamily" name="las la-font" color="white" class="q-mr-sm" size="30px" />
      <q-icon @click="toggleFontBold" name="las la-bold" color="white" class="q-mr-sm" size="30px" />
      <q-icon @click="returnCanvasState" name="las la-undo" color="white" class="q-mr-sm" size="30pxImage" />
    </div>

  </div>
</template>

<script>
// import { fabric } from 'fabric'
import Cropper from 'src/components/cropper'
import EventBus from 'src/eventBus.js'

export default {
  name: 'Publish',
  components: { Cropper },
  data() {
    return {
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
        fontColors: [
          '#019A9D', '#D9B801', '#E8045A', '#B2028A',
          '#2A0449', '#fff', '#000'
        ]
      },
      textarea: {
        fontFamily: 'Lato',
        fontWeight: '',
        fontSize: 20,
        color: '#FFF'
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

    changeFontFamily() {

    },

    returnCanvasState() {

    },

    toggleFontBold() {
      this.textarea.fontWeight = (!this.textarea.fontWeight) ? 'bold' : ''
    }
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