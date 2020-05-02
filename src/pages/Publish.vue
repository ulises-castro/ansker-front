<template>
  <div ref="container">
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
      <q-icon @click="returnCanvasState" name="las la-undo" color="white" class="q-mr-sm" size="30pxImage" />
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
      this.saveCanvasState()

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
    returnCanvasState() {
      this.canvas.clear();

      this.canvas.loadFromJSON(this.canvasPrevState, this.canvas.renderAll.bind(this.canvas));
    },
    saveCanvasState() {
      this.canvasPrevState = this.canvas.toJSON()
    },
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
    },
    changeFontFamily() {
      const { fontFamilies } = this.editorOptions
      let indexFont = fontFamilies.indexOf(this.text.element.fontFamily)
      indexFont = (indexFont + 1 < fontFamilies.length) ? indexFont + 1 : 0

      this.saveCanvasState()
      this.text.element.fontFamily = fontFamilies[indexFont]

      console.log(this.text.element.fontFamily)
    },
    toggleFontBold() {
      const toggleBold = !this.text.element.fontWeight ? 'bold' : ''

      this.saveCanvasState()
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

      fabric.Image.fromURL(data, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {

          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height
        })

        this.saveCanvasState()
      })
    }
  },
  created() {
    EventBus.$emit('toggleUI', false)
  },
  mounted() {
    this.assignCanvas()
    this.initialize(this.canvas)

    this.canvas.selection = false

    this.$refs.container.addEventListener ("touchmove", function() { console.log('hola') },  false);

this.canvas.on('touch:start', (opt) => {
  console.log('hola canvas')
  let delta = opt.e.deltaY;
  let zoom = this.canvas.getZoom();
  zoom = zoom + delta/200;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  this.canvas.setZoom(zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
})

    return
this.canvas.on({
    'touch:start': function(e) {
      alert('estar')
        if (e.e.touches && e.e.touches.length == 2) {
            pausePanning = true;
            var point = new fabric.Point(e.self.x, e.self.y);
            if (e.self.state == "start") {
                zoomStartScale = canvas.getZoom();
            }
            var delta = zoomStartScale * e.self.scale;
            canvas.zoomToPoint(point, delta);
            pausePanning = false;
        }
    },
    'object:selected': function() {
        pausePanning = true;
    },
    'selection:cleared': function() {
        pausePanning = false;
    },
    'touch:drag': function(e) {
        if (pausePanning == false && undefined != e.self.x && undefined != e.self.x) {
            currentX = e.self.x;
            currentY = e.self.y;
            xChange = currentX - lastX;
            yChange = currentY - lastY;

            if( (Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
                var delta = new fabric.Point(xChange, yChange);
                canvas.relativePan(delta);
            }

            lastX = e.self.x;
            lastY = e.self.y;
        }
    }
})

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