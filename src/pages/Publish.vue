<template>
  <div>
    <canvas
      ref="can"
      :width="screen.width"
      :height="screen.height">
    </canvas>
    <div class="toolbar row justify-around">
      <div class="font-colors" v-if="showEditor.fontColor">
        <div
          class="color-container"
          v-for="(color, index) in editorOptions.fontColors"
          :key="index" @click="text.fill = color">
          <div class="" :style="{'background-color': color}">
          </div>
        </div>
      </div>

      <q-icon @click="changeFontFamily" name="las la-font" color="white" class="q-mr-sm" size="30px" />
      <q-icon @click="toggleFontBold" name="las la-bold" color="white" class="q-mr-sm" size="30px" />
      <q-icon name="las la-undo" color="white" class="q-mr-sm" size="30pxImage" />
    </div>

  </div>
</template>

<script>
import { fabric } from 'fabric'

export default {
  name: 'Publish',
  data() {
    return {
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
      canvas: new fabric.Canvas(this.$refs.can),
      text: {
        element: false,
        fontFamily: 'Lato',
        fontBold: '',
        fontSize: 30,
        fill: '#ff0000'
      },
    }
  },
  watch: {
    'text.fill'(color) {
      this.text.element.fill = color
      this.text.element.styles = '' + Math.random()

      this.canvas.renderAll()
    }
  },
  methods: {
    generateImage() {
      this.href = this.canvas.toDataURL({
        format: 'png',
        quality: 0.8,
      })
    },
    assignCanvas() {
      const ref = this.$refs.can
      const canvas = new fabric.Canvas(ref)
      this.canvas = canvas

      return canvas
    },
    changeFontFamily() {
      const { fontFamilies } = this.editorOptions
      let indexFont = fontFamilies.indexOf(this.text.fontFamily)
      indexFont = (indexFont < fontFamilies.length) ? indexFont += 1 : 0

      // this.text.fontFamily = fontFamilies[indexFont]
      // fontFamilies[indexFont]
      // this.text.fontFamily = 'helvetica'
      this.text.element.fontFamily = fontFamilies[indexFont]
      this.text.element.styles = '' + Math.random()

      this.canvas.renderAll()
    },
    toggleFontBold() {
      const toggleBold = !this.text.element.fontWeight ? 'bold' : ''

      this.text.element.fontWeight = toggleBold

      this.canvas.renderAll()
    },
    initialize(canvas) {
      const data = `/statics/wallpaper.jpg`
      const { fontFamily, fontSize, fill } = this.text

      const textImage = new fabric.IText('Escribe aqui...', {
        left: (this.screen.width / 2) - (30 * 2),
        top: (this.screen.height / 2) - 30,
        fontFamily,
        fontSize,
        fill,
        caching: false,
      })
      canvas.add(textImage)
      this.text.element = textImage

      this.text.element.hasControls = false
      canvas.renderAll()

      fabric.Image.fromURL(data, function(img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {

          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height
        });

      })
    }
  },
  mounted() {
    const canvas = this.assignCanvas()
    this.initialize(canvas)
  }
}
</script>
<style lang="scss" scoped>
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

.color-picker {
}

.font-colors {
  position: absolute;
  display: flex;
  bottom: 50px;

  .color-container {
    display: block;
    height: 24px;
    width: 24px;
    margin-right: 1em;

    div {
      height: 100%;
      width: 100%;
      border: 2px solid white;
      border-radius: 50%;
    }
  }
}
</style>