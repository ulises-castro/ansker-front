<template>
  <section>

  <aside class="scrolling-wrapper" style="padding: 60px 20px 10px 5px">
    <q-chip clickable @click="selectHotCity(0)" color="primary" text-color="white" size="1rem">
      Manzanillo
    </q-chip>

    <q-chip clickable @click="selectHotCity(1)" color="primary" text-color="white" size="1rem">
      Colima
    </q-chip>

    <q-chip clickable @click="selectHotCity(2)" color="primary" text-color="white" size="1rem">
      Guadalajara
    </q-chip>

    <q-chip clickable @click="restoreSelectedCity" color="primary" text-color="white" size="1rem">
      Worldwide
    </q-chip>
  </aside>

  <div style="padding-top: 10px">
    <van-search
      v-model="citySearchValue"
      placeholder="Buscar ciudad"
      shape="round"
      :error="citiesNotFound"
      :show-action="(citiesSearchFound.length > 0)"
      @blur.native="citiesSearchFound = []"
      @search="onSearchCity"
      @keyup.native="onSearchCity"
    >
      <van-loading
        size="18px"
        color="#54a0c0"
        style="margin-top: 3px"
        v-if="isLoadingCities && citySearchValue.length > 3"
        slot="left-icon"
      />
      <div slot="action" @click="citiesSearchFound = []">Cerrar</div>
    </van-search>
  </div>
    <!--
    <div class="w-full flex justify-center">
      <div class="button-group flex">
        <div class="q-pa-sm"
          @click="showQuestions  = false">Opiniones</div>
        <div class="q-pa-sm selected"
          @click="showQuestions  = true">Preguntas</div>
      </div>
    </div>
    -->

    <aside v-if="citiesSearchFound.length" class="citiesFound full-width">
      <div class="full-width q-px-md">
        <div
          v-for="(city, index) in citiesSearchFound"
          :key="index"
          @click="updateSelectedCity(city)"
          class="q-px-lg cities"
          style="background: white"
        >
          {{ city.name }} -
          {{ city.countryName }} {{ city.flag }}
        </div>
      </div>
    </aside>

    <section class="publications q-pt-md" style="padding-bottom: 55px">
      <div v-if="showDiscoverShare" class="text-white text-center row" style="background: rgb(38, 128, 146); border: 1px solid #e4e4e4; border-bottom: 1px solid">
        <h5 class="full-width text-center q-mt-lg q-mb-sm">
          Ayudanos a difundir
        </h5>
        <span class="full-width q-pa-sm" style="font-size: 1em">
          Compartiendo a Ansker con tus amigos
        </span>
        <div class="row justify-center full-width q-py-md">
          <button @click="share" class="btn-white text-bold q-mr-lg" style="color: rgb(38, 128, 146)"> Compartir
          </button>
          <button @click="hideDiscoverShare" class="btn-white text-bold" style="color: rgb(38, 128, 146)">
            Ocultar
          </button>
        </div>
      </div>
      <div v-if="publications.length">
        <div v-for="publication in publications" :key="publication.id">
          <publication :publication="publication"></publication>
        </div>
      </div>

      <div v-if="notMoreToLoad" class="text-white text-center row" style="background: rgb(38, 128, 146); border: 1px solid #e4e4e4; border-bottom: 1px solid">
        <h5 class="full-width text-center q-mt-lg q-mb-sm">
          Hemos llegado al final
        </h5>
        <span class="full-width q-pa-sm" style="font-size: 1em">
          Te invitamos a publicar una historia
        </span>
        <div class="row justify-center full-width q-py-md">
          <button @click="handlerGoPublish" class="btn-white text-bold q-mr-lg" style="color: rgb(38, 128, 146)"> Ir a publicar </button>
        </div>
      </div>
    </section>

    <share :propShowShare="propShowShare" :shareText="shareText"></share>

  </section>
</template>
<script>
/* eslint-disable */
import Publication from 'src/services/PublicationService'
import publication from 'src/components/Publication'
import ShareMixin from 'src/mixins/share'
import { messaging } from 'src/firebase'
import share from 'components/Share'
import { City } from 'src/services'
import User from 'src/services/UserService'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Discover",
  props: ['handlerError'],
  components: {
    share,
    publication,
  },
  mixins: [ ShareMixin ],
  data() {
    return {
      publications: [{}, {}, {}, {}, {}],
      isLoading: true,
      showPublishSecretModal: false,
      citySearchValue: '',
      citySelected: {},
      citiesNotFound: false,
      isLoadingCities: false,
      activeHotCities: [],
      notMoreToLoad: false,
      citiesSearchFound: [],
      pageNumber: 1,
    }
  },
  created() {
    if (this.selectedCity.name) {
      this.citySelected = this.selectedCity
      this.citySearchValue = this.selectedCity.name
    }
  },
  mounted() {
    this.registerPushtoken()

    this.fetchPublications()

    this.activeHotCities = this.showHotCities

    window.addEventListener('scroll', this.infinityScrollPaginator)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.infinityScrollPaginator)
  },
  computed: {
    ...mapGetters('User', ['selectedCity', 'pushToken']),
    ...mapGetters('Theme', ['showDiscoverShare', 'showHotCities'])
  },
  watch: {
    citySearchValue(newCityValue) {
      if (!newCityValue) {
        this.restoreSelectedCity()
        this.fetchPublications()
      }
    },
    activeHotCities() {
      const hidden = (!this.activeHotCities.length)
      this.hideHotCities(hidden)
    }
  },
  methods: {
    ...mapActions('User', ['selectCity', 'setPushToken']),
    ...mapActions('Theme', ['hideDiscoverShare', 'hideHotCities']),
    // TODO: Choice from suscribe via notifications
    registerPushtoken() {
      if ( !this.pushToken ) {
        messaging.requestPermission().then(() => {
        console.log('Notification permission granted.')
        // Get Token

          messaging.getToken().then((token) => {
            console.log(token)

            this.sendDevice(token)
          })
        }).catch((err) => {
          console.log('Unable to get permission to notify.', err)
        })
      }
    },
    async sendDevice(token) {
      const deviceData = {
        ...this.$q.platform,
        token
      }

      const [err, responseData] = await User.sendDeviceUser(deviceData)

      if (err) return this.$notify(err)

      this.setPushToken(token)
    },
    infinityScrollPaginator(evt) {
      const html = document.getElementsByTagName("html")[0]
      const bottomOfWindow = ((html.scrollTop + window.innerHeight) + 1 >= html.offsetHeight)

      if (bottomOfWindow && !this.notMoreToLoad) {
        this.pageNumber++
        this.fetchPublications()
      }
    },
    handlerGoPublish() {
      this.$router.push({ name: 'Publish' })
    },
    restoreCitiesParams() {
      this.publications = [{}, {}, {}]
      this.pageNumber = 1
      this.notMoreToLoad = false
    },
    restoreSelectedCity() {
      if (!this.citySearchValue) return

      this.restoreCitiesParams()

      this.citiesSearchFound = []
      this.citySearchValue = ''
      this.citySelected = {}

      this.selectCity({})
    },
    selectHotCity(citySelected) {
      const cities = [
        {"cityId":3996663,"name":"Manzanillo","altName":"","country":"MX","featureCode":"PPLA2","adminCode":"08","population":110735,"loc":{"type":"Point","coordinates":[-104.34214,19.11695]},"countryName":"Mexico","flag":"🇲🇽"},
        {"cityId":4013516,"name":"Colima","altName":"","country":"MX","featureCode":"PPLA","adminCode":"08","population":127235,"loc":{"type":"Point","coordinates":[-103.72714,19.24997]},"countryName":"Mexico","flag":"🇲🇽"},
        {"cityId":4005539,"name":"Guadalajara","altName":"","country":"MX","featureCode":"PPLA","adminCode":"14","population":1640589,"loc":{"type":"Point","coordinates":[-103.39182,20.66682]},"countryName":"Mexico","flag":"🇲🇽"}
      ]

      this.restoreCitiesParams()
      const city = cities[citySelected]

      this.updateSelectedCity(city)
    },
    updateSelectedCity(city) {
      this.restoreCitiesParams()

      this.citySelected = city
      this.citySearchValue = city.name
      this.citiesSearchFound = []

      this.selectCity(city)
      this.fetchPublications()
    },
    async fetchPublications() {
      const fetchBy = this.citySearchValue ? 'getAllByCity' : 'getAll'
      const [err, publicationsResponse] = await Publication[fetchBy]({
        countryCode: this.selectedCity.country,
        city: this.selectedCity.name,
        pageNumber: this.pageNumber
      })

      if (err) this.handlerError(err)

      const loadedPublications = publicationsResponse.data.publications
      this.publications = this.publications.filter(publication => Object.keys(publication).length)

      if (loadedPublications.length === 2) {

        this.publications.push(...loadedPublications)
      } else {
        if (loadedPublications.length) this.publications.push(...loadedPublications)

        this.notMoreToLoad = true
      }
    },
    async onSearchCity() {
      const { citySearchValue } = this

      if (citySearchValue.length < 3) return

      clearTimeout(this.timerLoading)
      this.isLoadingCities = true

      const [err, citiesData] = await City.searchCity(citySearchValue)

      if (err) return this.handlerError(err)

      const { cities } = citiesData.data

      this.citiesSearchFound = cities

      this.timerLoading = setTimeout(() => (this.isLoadingCities = false), 800)
    }
  }
}
</script>
<style lang="scss" scoped>
.cities {
  font-size: 1em;
  padding: 15px;

  &:last-child {
    padding-bottom: 20px;
  }
}

.citiesFound {
  background: white;
  position: absolute;
  z-index: 1000;
}

.button-group {
  border: 2px solid rgb(103, 210, 231);
  border-radius: 15px;
  max-width: 250px;
  font-weight: bold;
  color: darken(rgb(103, 210, 231), 20%);
}

.button-group .selected {
  background: rgb(107, 215, 236);
  color: white;
  border-radius: 8px 0 0 8px;
}
</style>