<template>
  <div class="publish-container overflow-hidden" ref="container" :style="{backgroundColor}">

    <div class="header-buttons row justify-end">
      <div class="row items-center text-weight-bold text-white text-shadow-1 q-mr-lg">
        <span>
          {{ textareaLength }} / 180
        </span>
      </div>

      <van-button
        @click="updateTextAreaValue(true)"
        size="small" plain type="primary button shadow-2 text-shadow-1">
        Publicar
        <q-icon name="lar la-paper-plane" color="#333333" class="" size="18px" />
      </van-button>
    </div>

    <div class="texteditor-container row full-width">
      <div class="col-12 textarea-container" style="z-index: 100">
        <textarea
          class="text-shadow-1 q-pa-lg"
          ref="textarea"
          @focus="showDoneButton = true"
          @blur="showDoneButton = false"
          maxlength="180"
          minlength="10"
          v-model="textarea.value"
          placeholder="Escribe aqui..."
          id="story"
          name="story">
        </textarea>
      </div>
    </div>

    <van-popup
      v-model="showBackgroundOptions"
      overlay-class="overlay-transparent"
      round
      position="bottom" :style="{ height: '30%' }">
      <div class="full-width q-pa-md text-center">
        <b>Seleccionar color de fondo</b>
      </div>
      <div v-for="bgColor in backgroundColors" :key="bgColor" style="height: 50%">
        <div @click="updateBackgroudColor(bgColor)" class="row fit" :style="`background: ${bgColor}`"></div>
      </div>
    </van-popup>

    <van-dialog v-model="showArentAvailable" title="Seguimos trabajando">
        <template #default>
          <div class="q-pa-md">
            <p class="text-center">
              Pronto tendremos mas mejoras
            </p>
            <div class="row full-width justify-center items-center">
              <q-icon name="las la-camera" color="#333333" class="q-mr-sm" size="30px" />
              <q-icon name="las la-font" color="#333" class="q-mr-sm" size="35px" />
              <q-icon name="fas fa-bold" color="#333" class="q-mr-sm" size="25px" />
            </div>
          </div>
        </template>
    </van-dialog>

    <div ref="toolbar" v-if="!showDoneButton" class="toolbar">
      <div class="row justify-around fit items-center text-shadow-2">
        <q-icon @click="showArentAvailable = true" name="las la-camera" color="white" class="q-mr-sm opacity-3" size="30px" />

        <q-icon @click="showBackgroundOptions = true" name="las la-palette" color="white" class="q-mr-sm" size="30px"/>

        <q-icon @click="showArentAvailable = true" name="las la-font" color="white" class="q-mr-sm opacity-3" size="35px" />

        <q-icon @click="showArentAvailable = true" name="fas fa-bold" color="white" class="q-mr-sm opacity-3" size="25px" />
      </div>
    </div>

  </div>
</template>

<script>
import EventBus from 'src/eventBus.js'

const initialTextArea = {
  fontFamily: 'Lato',
  fontWeight: '',
  fontSize: 20,
  color: '#FFF',
  oldValue: '',
  value: '',
}

const initialData = {
  textarea: initialTextArea,
  prevCanvasStack: {
    textarea: [{ ...initialTextArea }],
  },
  backgroundColors: [
    '#0e5181', '#028f92', '#c7ac0f', '#E8045A', '#B2028A',
  ],
}

export default {
  name: 'Publish',
  data() {
    return {
      ...initialData,
      showArentAvailable: false,
      showBackgroundOptions: false,
      editText: false,
      showDoneButton: false,
      croppa: {},
      imageSelected: '/statics/wallpaper.jpg',
      canvasPrevState: false,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      showEditor: {
        fontFamily: false,
        fontColor: !false,
      },
      backgroundColor: initialData.backgroundColors[0],
      editorOptions: {
        fontFamilies: [
          'Arial',
          'sans-serif',
          'Lato',
          'Helvetica'],
      },
    }
  },
  computed: {
    textareaLength() {
      return this.textarea.value.length
    }
  },
  methods: {
    updateBackgroudColor(color) {
      this.backgroundColor = color
      this.$refs.canvas.$el.style.backgroundColor = color
    },
  },
  watch: {
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

.header-buttons {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  top: 15px;
  z-index: 10;

  .button {
    background: transparent;
    color: white;
    border: 2px solid white;
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
  height: 60px;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.4);
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

.texteditor-container {
  position: absolute;
  top: 35vh;
}

.textarea-container {
  height: 40vh;
  color: white;
  font-size: 20px;

  & textarea {
    width: 100%;
    resize: none;
    height: 100%;
    background: transparent;
    border: 2px solid rgba($color: #000000, $alpha: 1.0);
    white-space: normal;
    text-align: justify;
    -moz-text-align-last: center;
    text-align-last: center;

    &::placeholder {
      color: white;
      opacity: 0.7;
    }
  }
}

.control {

  &-font-size {
    z-index: 10;
  }

  &-font-colors {
    position: absolute;
    display: flex;
    bottom: 80px;

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