<template lang="html">
  <section
    class="section-publish-container flex flex-wrap">
    <van-loading v-if="isLoading" />
    <!-- <van-nav-bar
      :title="title"
      class="header-publish"
      left-text="Regresar"
      left-arrow
      right-text="Publicar"
      @click-left="handlerActionLeft"
      >
      <div slot="right" class="has-text-white">
        <span>Publicar</span>
        <i style="color: white"
          class="fas fa-feather-alt"></i>
      </div>
      <div slot="title"
        class="flex flex-center has-text-white">
        <div><i class="fas fa-camera"></i></div>
      </div>
      </van-nav-bar> -->

    <div
      class="publish-container is-relative width100">

      <van-image
        lazy-load
        class="background-image"
        :src="background"
        :width="screen.width"
        :height="300">
      </van-image>

      <textarea
        class="publishContainer"
        ref="publishArea"
        id="textarea"
        placeholder="Escribe aquí"
        name="secret"
        maxlength="120"
        v-model="form.content">
      </textarea>

      <div class="footer-actions flex space-between">
        <div class="flex">
          <div
            class="icon-container pointer is-size-4 m-20"
            @click.prevent="changeBgColor">
            <i class="fas fa-camera has-text-white"></i>
          </div>
          <div
          class="icon-container pointer is-size-4 m-20"
          @click.prevent="changeBgColor">
            <i class="fas fa-palette has-text-white"></i>
          </div>
        <div
          class="icon-container pointer is-size-4 m-20"
          @click.prevent="changeBgColor">
            <i class="fas fa-font has-text-white"></i>
        </div>
        <div class="flex flex-middle p0-10">
          <span class="counter-text-lenght">{{ form.content.length }}/120</span>
        </div>
        <div
          @click="publish"
          class="icon-container pointer m-20">
          <b-icon
            type="is-white"
            icon="paper-plane"
            size="is-medium">
          </b-icon>
        </div>
      </div>
        </div>

    </div>

    <div class="width100">
      <van-notice-bar
        color="#1989fa"
        background="#fff"
        left-icon="info-o"
        mode="closeable"
      >
        Para el zoom (Utiliza dos dedos), para mover la imagén (presiona y mueve), en la imagén de abajo
      </van-notice-bar>
      <image-edit
        ref="image-edit"
        v-model="imageSelected"
        :width="this.screen.width"
        :height="200"
        :quality="2"
        :zoom-speed="10"
        :disable-rotation="true"
        :show-remove-button="!false"
        :prevent-white-space="true"
        placeholder="Seleccionar imagén"
        @file-choose="alert('file choose')"
        @file-size-exceed="alert('file size exceeds')"
        @file-type-mismatch="alert('file type mismatches')"
        @new-image="alert('new image attatched')"
        @image-remove="removeBackgroundImage"
        @loading-start="isLoading = true"
        @loading-end="isLoading = false"
        @new-image-drawn="updateBackgroundImage"
        @zoom="updateBackgroundImage"
        @move="updateBackgroundImage">
        <!-- <div @click="check" style="font-size: 2em; color:white; position: relative; top: -100px">This is a interesting test about canvas
        </div> -->
      </image-edit>
    </div>
  </section>
</template>
<script>
import { post } from '@/api/';
import axios from 'axios';

export default {
  name: 'PublishSecret',
  data() {
    return {
      // TODO: Fetch data via endpoint
      imageSelected: '',
      background: 'https://www.theswellelife.com/.a/6a00e54ef16809883301b8d2dcf28f970c-800wi',
      isLoading: false,
      availableColours: [
        '#0000ff',
        '#ffa500',
        '#065535',
        '#ffc0cb',
        '#ff0000',
        '#003366',
        '#008080',
        '#8a2be2',
        '#666666',
        '#ff1493'],
      form: {
        content: '',
        backgroundSelected: 0,
        longitude: '',
        latitude: '',
        location: {},
      },
      screen: {
        width: window.innerWidth,
        height: window.innerHeight / 2,
      },
    }
  },
  methods: {
    async publish() {
      const {
        content, backgroundSelected,
        longitude, latitude,
        location,
      } = this.form;

      const params = {
        content,
        backgroundColor: this.availableColours[backgroundSelected],
        longitude,
        latitude,
        ...location,
      };

      const { data } = await post('secret/publish', params);

      const type = (data) ? 'is-success' : 'is-danger';

      this.$router.push({ name: 'Discover' });
    },
    drawTextInImage() {
      this.croppaImageMetaData = this.imageSelected.getMetadata()

      let ctx = this.imageSelected.getContext();
      // ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

      // console.log(this.imageSelected.$refs.canvas.getContext());

      // ctx.fillText('My text', 100, 50);
      // console.log('Check');
      // ctx.fillStyle = "white";
      // ctx.font = "bold 50px Arial";
      // let publication = this.form.content;
      // ctx.fillText(publication, (this.imageSelected.width / 2) - 17, (this.imageSelected.height / 2) + 8);

      this.multilinesCanvas(
        "Please could you stop the noise, I'm trying to get some",
        {
          rect: {
            x: 0,
            y: 0,
            width: 500,
            height: this.imageSelected.height - 20
          },
          verbose: true,
          lineHeight: 1.4,
          minFontSize: 50,
          maxFontSize: 120,
        }
      );
    },
    removeBackgroundImage() {
      this.background = '';
    },
    updateBackgroundImage() {
      this.$refs.publishArea.blur();
      this.background =
        this.imageSelected.generateDataUrl('image/jpeg', 0.8);
      
      setTimeout(() => this.drawTextInImage(), 500);
    },
    changeBgColor() {
      this.$refs.publishArea.focus();
      this.$refs.publishArea.click();
      const { form } = this;
      const currentLength = this.availableColours.length - 1;

      if (form.backgroundSelected === currentLength)
          form.backgroundSelected = 0;
      else
        form.backgroundSelected++;
    },
    showError() {
      this.$toast.open({
        duration: 3000,
        message: this.$t('user.location_permission.denied'),
        position: 'is-top',
        type: 'is-danger',
      });
    },
    async getLocationUser() {

    },
    async updateUserLocation(position) {
      const { latitude, longitude } = position.coords;

      this.form.latitude = latitude;
      this.form.longitude = longitude;

      const url = `https://utility.arcgis.com/usrsvcs/appservices/ALYmls905v3B6fIJ/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${longitude},${latitude}`;

      const tokenSaved = axios.defaults.headers.common['Authorization'];

      delete axios.defaults.headers.common['Authorization'];

      const { data } = await axios.post(
        url,
        { longitude, latitude }
      );

      axios.defaults.headers.common['Authorization'] = `${tokenSaved}`;

      this.form.location = data.address;
    },
    multilinesCanvas(text, opts) {
        let ctx = this.imageSelected.getContext('2d');
        // Default options 
        if(!opts)
          opts = {}
        if (!opts.font)
          opts.font = 'sans-serif'
        if (typeof opts.stroke == 'undefined')
          opts.stroke = false
        if (typeof opts.verbose == 'undefined')
          opts.verbose = false
        if (!opts.rect)
          opts.rect = {
            x: 0,
            y: 0,
            width: ctx.canvas.width,
            height: ctx.canvas.height
          }
        if (!opts.lineHeight)
          opts.lineHeight = 1.1
        if (!opts.minFontSize)
          opts.minFontSize = 30
        if (!opts.maxFontSize)
          opts.maxFontSize = 100
        // Default log function is console.log - Note: if verbose il false, nothing will be logged anyway
        if (!opts.logFunction)
          opts.logFunction = function(message) { console.log(message) }


        const words = require('words-array')(text)
        if (opts.verbose) opts.logFunction('Text contains ' + words.length + ' words')
        var lines = []

        // Finds max font size  which can be used to print whole text in opts.rec
        for (var fontSize = opts.minFontSize; fontSize <= opts.maxFontSize; fontSize++) {

          // Line height
          var lineHeight = fontSize * opts.lineHeight

          // Set font for testing with measureText()
          ctx.font = ' ' + fontSize + 'px ' + opts.font

          // Start
          var x = opts.rect.x
          var y = opts.rect.y + fontSize // It's the bottom line of the letters
          lines = []
          var line = ''

          // Cycles on words
          for (var word of words) {
            // Add next word to line
            var linePlus = line + word + ' '
            // If added word exceeds rect width...
            if (ctx.measureText(linePlus).width > (opts.rect.width)) {
              // ..."prints" (save) the line without last word
              lines.push({ text: line, x: x, y: y })
              // New line with ctx last word
              line = word + ' '
              y += lineHeight
            } else {
              // ...continues appending words
              line = linePlus
            }
          }

          // "Print" (save) last line
          lines.push({ text: line, x: x, y: y })

          // If bottom of rect is reached then breaks "fontSize" cycle
          if (y > opts.rect.height)
            break

        }

        if (opts.verbose) opts.logFunction('Font used: ' + ctx.font)

        // Print lines
        for (var line of lines)
          // Fill or stroke
          if (opts.stroke)
            ctx.strokeText(line.text.trim(), line.x, line.y)
          else
            ctx.fillText(line.text.trim(), line.x, line.y)

        // Returns font size
        return fontSize
      }
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updateUserLocation, this.showError);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.publishArea.focus();
      // this.$refs.publishArea.click();
    }, 1000);

  }
}
</script>

<style lang="scss" scoped>

$text-shadow-actions: 0px 0px 3px #696969;

.section-publish-container {
  height: 100vh;
}

.header-publish {
  background: transparent;
  color: white !important;

  .van-nav-bar__text {
    color: white !important;
  }

  .van-icon {
    color: white !important;
    
  }
}

.publish-container {
  background: #fff;
  position: relative;
  height: 300px;
  width: 100%;
}

.publishContainer {
  background: none;
  color: white;
  width: 90%;
  text-align: center;
  padding: 10% 0;
  padding-left: 5%;
  font-size: 28px;
  font-weight: bold;
  height: calc(100% - 70px);

  position: absolute;
  top: 0;
  left: 0;

  // Remove default especifications
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/

  &::placeholder {
    color: white;
    font-size: 28px;
    opacity: .8;
    font-weight: bold;
  }
}

.counter-text-lenght {
  font-weight: bold;
  font-size: 20px;
  color: white;
  text-shadow: $text-shadow-actions;
}

.footer-actions {
  position: absolute;
  bottom: 0;
  width: 100%;

  i {
    // text-shadow: 0px 0px 3px #969696;
    text-shadow: $text-shadow-actions;
  }
}

</style>
