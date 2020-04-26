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
      <q-icon @click="showEditor.fontFamily = true" name="las la-font" color="white" class="q-mr-sm" size="30px" />
      <q-icon @click="toggleFontBold" name="las la-bold" color="white" class="q-mr-sm" size="30px" />
      <q-icon name="las la-undo" color="white" class="q-mr-sm" size="30pxImage" />
    </div>
    <van-popup
      v-model="showEditor.fontFamily"
      position="bottom">
      <p class="text-center q-pt-md">
        <b class="p-10"> Tipo de fuente</b>
      </p>
      <van-picker
        :columns="editorOptions.fontFamilies"
        @cancel="showEditor.fontFamily = false"
        @change="changeFontFamily"
      />
    </van-popup>


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
          '<span style="font-family: Arial">Arial</span>',
          '<span style="font-family: sans-serif">Sans Serif</span>',
          '<span style="font-family: Lato">Lato</span>',
          '<span style="font-family: Helvetica">Helvetica</span>'],
        fontColors: [
          '#019A9D', '#D9B801', '#E8045A', '#B2028A',
          '#2A0449', '#019A9D'
        ]
      },
      canvas: new fabric.Canvas(this.$refs.can),
      text: {
        element: false,
        fontFamily: 'sans-serif',
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
  // computed: {
  //   'text.fontBold'() {
  //     this.text.element.fontWeight = 'bold'

  //     this.canvas.renderAll()
  //   }
  // },
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
    changeFontFamily(family) {
      this.text.fontFamily = family

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
    height: 22px;
    width: 22px;
    margin-right: 10px;

    div {
      height: 100%;
      width: 100%;
      border: 2px solid white;
      border-radius: 50%;

      // &:last-child: {
      //   margin-right: 0;
      // }
    }
  }
}
</style>