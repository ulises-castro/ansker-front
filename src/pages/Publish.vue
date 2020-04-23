<template>
  <div>
    <canvas
      ref="can"
      :width="screen.width"
      :height="screen.height">
    </canvas>
    <div class="toolbar">
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
  // name: 'PageName',
  data() {
    return {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      canvas: new fabric.Canvas('image-area')
    }
  },
  mounted() {
    const ref = this.$refs.can;
    const canvas = new fabric.Canvas(ref);

    const data = `/statics/wallpaper.jpg`

    const textImage = new fabric.IText('Escribe aqui...', {
      left: (this.screen.width / 2) - (30 * 2),
      top: (this.screen.height / 2) - 30,
      fontFamily: 'Lobster',
      fontSize: 30,
      caching: false,
      fill: 'white',
    });
    canvas.add(textImage);

    textImage.hasControls = false;
    canvas.renderAll();

    const ratio = 1290 / 720;

fabric.Image.fromURL(data, function(img) {
      // add background image
      console.log(img)
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        // width: 1290 * ratio,
        // height: 720 / ratio
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });

    })
  }
}
</script>
