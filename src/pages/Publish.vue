<template>
  <div>
    <canvas
      ref="can"
      :width="screen.width"
      :height="screen.height">
    </canvas>
    <div class="toolbar row justify-around">
      <q-icon @click="showEditor.fontFamily = true" name="las la-font" color="white" class="q-mr-sm" size="30px" />
      <q-icon name="las la-bold" color="white" class="q-mr-sm" size="30px" />
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
      },
      editorOptions: {
        fontFamilies: ['<span class="arial">Arial</span>', '<span class="sans-serif">Sans Serif</span>', '<span class="helvetica">Helvetica</span>']
      },
      canvas: new fabric.Canvas(this.$refs.can),
      text: {
        element: false,
        fontFamily: 'sans-serif',
        fontSize: 30,
        fill: 'white'
      },
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
      this.text.element.fontFamily = 'Arial'

      this.canvas.renderAll()
    }
  },
  mounted() {
    const canvas = this.assignCanvas()

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
}
</script>
<style lang="scss" scoped>
.van-tabbar--fixed {
  display: none !important;
}

.toolbar {
  position: absolute;
  width: 100%;
  padding: 5px;
  bottom: 100px;
  background: rgba(255, 255, 255, 0.5);
}

.arial {
  font-family: Arial;
}

.helvetica {
  font-family: Helvetica;
}

.sans-serif {
  font-family: sans-serif;
}
</style>