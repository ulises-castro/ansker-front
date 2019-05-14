<template lang="html">
  <container-app :isLoading="isLoading">
    <section :is-full-page="isLoading" ref="section" class="container is-fluid height100">
      <aside
        v-if="!authorizedGeolocation" class="width100 height100 p-t-60 has-background-primary is-size-4 has-text-weight-bold has-text-white">
        <p class="p-10">
          Para poder mostrarte las publicaciones cercanas a ti, necesitamos acceder a tu ubicación.
        </p>
          <div class="flex flex-center width100">
            <div class="flex width100 space-around p-t-10" style="max-width: 450px">
              <b-button
                @click="askForLocationPermission"
                type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
                Permitir acceso a ubicación
              </b-button>
            </div>
          </div>
        </div>
      </aside>

      <aside
        v-if="!secrets.length && !isLoading" class="width100 height100 p-t-60 has-background-primary is-size-4 has-text-weight-bold has-text-white">
        <p class="p-10">
          Por el momento no hay publicaciones cerca de ti.
        </p>
        <p class="p-b-15">
          ¡Se el primero en publicar!
        </p>
          <div class="flex flex-center width100">
            <div class="flex width100 space-around p-t-10" style="max-width: 450px">
              <b-button
                @click="showPublishSecret"
                type="is-light has-text-primary is-uppercase has-text-weight-bold is-size-6" rounded>
                Publicar
              </b-button>
            </div>
          </div>
        </div>
      </aside>

      <aside
        class=""
        @click="showPublishSecret"
        :class="{'publish-button-float' : true}">
        <b-icon size="is-medium" icon="feather-alt" pack="fas" />
      </aside>

      <div
        v-if="showShareAdvice"
        class="shareus has-text-white-bis flex width100 has-background-primary">
        <div class="width100 p10 p15-0">
          <h3 class="is-size-4 width100 has-text-weight-bold">
            Ayudanos a difundir
          </h3>
          <span class="is-size-5 p15">
            Comparte en tus redes sociales
          </span>

          <div class="flex flex-center width100">
            <div class="flex width100 space-around p-t-10" style="max-width: 450px">
              <social-share
                quote='Comparte lo que piensas con tu alrededor de manera anónima'
                text="Comparte lo que piensas con tu alrededor de manera anónima en https://ansker.me">
                <b-button
                  type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
                  Compartir
                </b-button>
              </social-share>
              <b-button
                @click="closeShareAdvice"
                type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
                Ocultar
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <aside class="secrets-container width100"
      :style="[{ 'padding-bottom: 0px !important': !secrets.length }]">
        <div class="secret" v-for="secret in secrets">
          <Secret :secret="secret" />
        </div>
      </aside>
    </section>
  </container-app>
</template>
<script>
import axios from 'axios';
import Menu from '@/components/Menu';
import Secret from '@/components/Secret';
import { get, post } from '@/api';

export default {
  name: 'Discover',
  data() {
    return {
      secrets: [],
      isLoading: true,
      showPublishSecretModal: false,
      publishMessage: '',
      showShareAdvice: this.$store.getters.showShareAdvice,
      authorizedGeolocation: this.$store.getters.authorizedGeolocation,
    }
  },
  components: {
    Menu,
    Secret,
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)', val);
    }
  },
  methods: {
    async fetchSecrets(latitude, longitude, userLocation) {
      const params = {
        latitude,
        longitude,
        ...userLocation
      };

      console.log(params, userLocation);

      const { data } = await post('secret/allByCity', params);

      this.isLoading = false;
      this.secrets = data.secrets;
    },
    showPublishSecret() {
      this.$router.push({ name: 'PublishSecret' });
    },
    closeShareAdvice() {
      this.$store.dispatch('hideShareAdvice');
      this.showShareAdvice = false;
    },
    async fetchUserLocation(longitude, latitude) {
      // TODO: Create a factoryFunction to reutilize code
      const url = `https://utility.arcgis.com/usrsvcs/appservices/ALYmls905v3B6fIJ/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${longitude},${latitude}`;

      const tokenSaved = axios.defaults.headers.common['Authorization'];

      delete axios.defaults.headers.common['Authorization'];

      const { data } = await axios.post(
        url,
        { longitude, latitude }
      );

      axios.defaults.headers.common['Authorization'] = `${tokenSaved}`;

      this.fetchSecrets(latitude, longitude, data.address)
    },
    getUserPosition(position) {
      const { latitude, longitude } = position.coords;

      const location = {
        latitude,
        longitude,
      };

      this.authorizedGeolocation = true;
      console.log(latitude, longitude);

      this.$store.dispatch('authorizedGeolocation', true);

      this.$store.dispatch('userLocation', location);

      const userLocation =
      this.fetchUserLocation(longitude, latitude);
    },
    showError() {
      this.$toast.open({
        duration: 5000,
        message: this.$t('user.location_permission.denied'),
        position: 'is-top',
        type: 'is-danger',
      });

      this.$store.dispatch('authorizedGeolocation', false);
    },
    askForLocationPermission() {
      if (navigator.geolocation) {
        this.getUserCoords();
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },
    getUserCoords() {
      navigator.geolocation.getCurrentPosition(this.getUserPosition, this.showError);
    }
   },
  created() {
    if (this.authorizedGeolocation) {
      this.getUserCoords();
    }
  },
  mounted() {
    console.log(this.$store.getters['entities/userData/all']());
  },
  metaInfo: {
    // Children can override the title.
    title: 'Publicaciones cerca de ti',
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';

.publish-button-float {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 80px;
  padding: 15px;
  border-radius: 100%;
  color: $primary;
  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.shareus {
  // height: calc(100vh - 150px);
}

.secrets-container {
  padding-bottom: 150px;
}

.modal {
  padding: 0 20px !important;

  .message {
    color: #404040;
    width: 100%;
    height: 120px;
    padding: 10px;
    border: 1px solid darken($light, 5%);
  }

  .card-content {
  }

  button {
    font-size: 15px;
  }
}
</style>
