<template>
  <section>
    <van-collapse :border="false" v-model="activeHotCities" style="padding-top: 50px">
      <van-collapse-item
        :border="false"
        title-class="text-weight-bold"
        title="Ciudades hot"
        name="cities"
      >
        <aside class="row justify-center wrap space-between">
          <div @click="selectHotCity(0)" class="row justify-center wrap" style="min-width: 50px max-width: 70px">
            <img
              height="38"
              width="38"
              style="border-radius: 50%"
              src="statics/cities/mx-manzanillo.jpg"
            />
            <small class="full-width text-center is-size-7">Manzanillo</small>
          </div>

          <div @click="selectHotCity(1)" class="row justify-center wrap" style="min-width: 50px max-width: 70px">
            <img
              height="38"
              width="38"
              style="border-radius: 50%"
              src="statics/cities/mx-colima.jpg"
            />
            <small class="full-width text-center is-size-7">Colima</small>
          </div>

          <div @click="restoreSelectedCity" class="row justify-center wrap" style="min-width: 50px max-width: 70px">
            <img
              height="38"
              width="38"
              style="border-radius: 50%"
              src="statics/cities/global.jpg"
            />
            <small class="full-width text-center is-size-7">Global</small>
          </div>

        </aside>
      </van-collapse-item>
    </van-collapse>

    <van-search
      v-model="citySearchValue"
      placeholder="Filtrar por ciudad"
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
          <button @click="share" class="btn-white text-blue-5 text-bold q-mr-lg"> Compartir </button>
          <button @click="hideDiscoverShare" class="btn-white text-blue-5 text-bold"> Ocultar </button>
        </div>
      </div>
      <div v-if="publications.length">
        <div v-for="publication in publications" :key="publication.id">
          <publication :publication="publication"></publication>
        </div>
      </div>
    </section>

    <share :propShowShare="propShowShare" :shareText="shareText"></share>

  </section>
</template>
<script>
import Publication from 'src/services/PublicationService'
import publication from 'src/components/Publication'
import ShareMixin from 'src/mixins/share'
import share from 'components/Share'
import { City } from 'src/services'

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
      citiesSearchFound: []
    }
  },
  created() {
    if (this.selectedCity.name) {
      this.citySelected = this.selectedCity
      this.citySearchValue = this.selectedCity.name
    }
  },
  mounted() {
    this.fetchPublications()

    this.activeHotCities = this.showHotCities
  },
  computed: {
    ...mapGetters('User', ['selectedCity']),
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
    ...mapActions('User', ['selectCity']),
    ...mapActions('Theme', ['hideDiscoverShare', 'hideHotCities']),
    restoreSelectedCity() {
      this.citiesSearchFound = []
      this.citySearchValue = ''
      this.citySelected = {}

      this.selectCity({})
    },
    selectHotCity(citySelected) {
      const cities = [
        {"cityId":3996663,"name":"Manzanillo","altName":"","country":"MX","featureCode":"PPLA2","adminCode":"08","population":110735,"loc":{"type":"Point","coordinates":[-104.34214,19.11695]},"countryName":"Mexico","flag":"🇲🇽"},
        {"cityId":4013516,"name":"Colima","altName":"","country":"MX","featureCode":"PPLA","adminCode":"08","population":127235,"loc":{"type":"Point","coordinates":[-103.72714,19.24997]},"countryName":"Mexico","flag":"🇲🇽"}
      ]

      const city = cities[citySelected]

      this.updateSelectedCity(city)
    },
    updateSelectedCity(city) {
      this.citySelected = city
      this.citySearchValue = city.name
      this.citiesSearchFound = []

      this.selectCity(city)
      this.fetchPublications()
    },
    async fetchPublications() {

      const fetchBy = this.citySearchValue ? 'getAllByCity' : 'getAll'
      const [err, publicationsResponse] = await Publication[fetchBy](this.selectedCity.country, this.selectedCity.name)

      if (err) this.handlerError(err)

      this.publications = publicationsResponse.data.publications
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
</style>