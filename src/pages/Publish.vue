<template>
  <div>
    <canvas ref="can" height="500" width="350"></canvas>
    <!-- <img src="https://i.pinimg.com/originals/61/6a/d8/616ad83e3cf5ef66fbcc43acb2b7499a.png"> -->
  </div>

</template>

<script>
import {fabric} from 'fabric'

export default {
  // name: 'PageName',
  data() {
    return {
      canvas: new fabric.Canvas('image-area')
    }
  },
  mounted() {
    const ref = this.$refs.can;
    const canvas = new fabric.Canvas(ref);

    const data = `https://i.pinimg.com/originals/61/6a/d8/616ad83e3cf5ef66fbcc43acb2b7499a.png`

 var iText4 = new fabric.IText('abcdefg\nhijklmnop', {
  left: 200,
  top: 50,
  fontFamily: 'Lobster',
  caching: false
 });
canvas.add(iText4);
canvas.renderAll();

    //  this.canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));

    // fabric.Image.fromURL(data, function(img) {
    //   // add background image
    //   canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    //     scaleX: canvas.width / img.width,
    //     scaleY: canvas.height / img.height
    //   });

    // })
  }
}
</script>
