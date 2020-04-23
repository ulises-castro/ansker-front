<template>
  <div>
    <canvas
      ref="can"
      :width="screen.width"
      :height="screen.height">
    </canvas>
    <div class="toolbar row justify-around">
      <q-icon name="las la-font" color="white" class="q-mr-sm" size="30px" />
      <q-icon name="las la-bold" color="white" class="q-mr-sm" size="30px" />
      <q-icon name="las la-undo" color="white" class="q-mr-sm" size="30px" />
    </div>
    <!-- <img src="https://i.pinimg.com/originals/61/6a/d8/616ad83e3cf5ef66fbcc43acb2b7499a.png"> -->
  </div>

</template>

<script>
import {fabric} from 'fabric'

export default {
  name: 'Publish',
  data() {
    return {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      canvas: new fabric.Canvas(this.$refs.can),
      text: {
        fontFamily: 'sans-serif',
        fontSize: 30,
        fill: 'white'
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

    textImage.hasControls = false
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
</style>