<template>
  <div>
    <img ref="backImg" src="/statics/wallpaper.jpg"/>
    <div class="shadow-5 control-font-size" :style="{ height: '130px' }">
      <van-slider
      :active-color="text.element.fill"
      button-size="22px"
      :max="40"
      :min="18"
      v-model="text.element.fontSize" vertical />
    </div>
    <canvas
      ref="can"
      :width="screen.width"
      :height="screen.height">
    </canvas>
    <div class="toolbar row justify-around">
      <div class="control-font-colors" v-if="showEditor.fontColor">
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
import EventBus from 'src/eventBus.js'

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
  computed: {
    textFontSize() {
      return this.text.element.fontSize
    }
  },
  watch: {
    'text.fill'(color) {
      this.text.element.fill = color
      this.text.element.styles = '' + Math.random()
    },
    text: {
      deep: true,
      handler() {
        this.canvas.renderAll()
      }
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

      this.text.element.fontFamily = fontFamilies[indexFont]

      console.log(this.text.element.fontFamily)
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
  created() {
    EventBus.$emit('toggleUI', false)
  },
  mounted() {
    const canvas = this.assignCanvas()
    this.initialize(canvas)

    const colorThief = new ColorThief();
    const img = this.$refs.backImg;

    if (img.complete) {
      colorThief.getColor(img);
    } else {
      img.addEventListener('load', () => {
        let palette = colorThief.getPalette(this.$refs.backImg).slice(0, 6)


        palette = palette.map(channels => {
          const inverted_channels = channels.map(function(ch) {
              return 255 - ch;
          })

          return 'rgb(' + inverted_channels.join(', ') + ')'
          // return `rgb(${channels[0]},${channels[1]},${channels[2]})`
        })


        this.editorOptions.fontColors = palette
      });
    }

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