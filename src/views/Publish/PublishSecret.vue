<template lang="html">
  <section
    class="publish-container width100"
    :style='`background: url(${background})`'>

    <van-nav-bar
      :title="title"
      class="header-publish"
      left-text="Regresar"
      left-arrow
      right-text="Publicar"
      @click-left="handlerActionLeft"
      >
      <div slot="right" class="has-text-white">
        <!-- <van-icon
          color="#49AFC4"
          class="is-size-5"
          info="30"
          name="bullhorn-o"
        /> -->
        <span>Publicar</span>
        <i style="color: white"
          class="fas fa-feather-alt"></i>
      </div>
      <div slot="title"
        class="flex flex-center has-text-white">
        <div><i class="fas fa-camera"></i></div>
      </div>
      </van-nav-bar>

    <div class="width100" style="overflow: hidden">
      <image-edit
        ref="image-edit"
        @new-image-drawn="background = imageSelected.generateDataUrl()"
        @move="background = imageSelected.generateDataUrl()"
        v-model="imageSelected"></image-edit>
      <textarea
        class="publishContainer"
        ref="publishArea"
        id="textarea"
        placeholder="Escribe aquí"
        name="secret"
        maxlength="120"
        v-model="form.content">
      </textarea>

      <div class="footer-icons flex space-between">
        <div class="flex">
          <div
          class="icon-container pointer m-20"
          @click.prevent="changeBgColor">
            <b-icon
              type="is-white"
              icon="palette"
              size="is-medium">
            </b-icon>
          </div>
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
      background: '',
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
      }
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
      this.$refs.publishArea.click();
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>

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
  background-size: cover;
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
}
</style>
