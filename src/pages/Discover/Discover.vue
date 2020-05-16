<template>
  <section>
    <van-collapse :border="false" v-model="activeCitiesHot">
      <van-collapse-item
        :border="false"
        title-class="text-weight-bold"
        title="Ciudades hot"
        name="1"
      >
        <aside class="row justify-center wrap space-between">
          <div class="row justify-center wrap" style="min-width: 50px max-width: 70px">
            <img
              height="38"
              width="38"
              style="border-radius: 50%"
              src="statics/cities/mx-manzanillo.jpg"
            />
            <small class="full-width text-center is-size-7">Manzanillo</small>
          </div>

          <div class="row justify-center wrap" style="min-width: 50px max-width: 70px">
            <img
              height="38"
              width="38"
              style="border-radius: 50%"
              src="statics/cities/mx-guadalajara.jpg"
            />
            <small class="full-width text-center is-size-7">Guadalajara</small>
          </div>

          <div class="row justify-center wrap" style="min-width: 50px max-width: 70px">
            <img
              height="38"
              width="38"
              style="border-radius: 50%"
              src="statics/cities/mx-tijuana.jpg"
            />
            <small class="full-width text-center is-size-7">Tijuana</small>
          </div>

          <div class="row justify-center wrap" style="min-width: 50px max-width: 70px">
            <img
              height="38"
              width="38"
              style="border-radius: 50%"
              src="statics/cities/mx-colima.jpg"
            />
            <small class="full-width text-center is-size-7">Colima</small>
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
      <div v-if="publications.length">
        <div v-for="publication in publications" :key="publication.id">
          <publication :publication="publication"></publication>
        </div>
      </div>
    </section>

  </section>
</template>
<script>
import Publication from 'src/services/PublicationService'
import publication from 'src/components/Publication'
import { City } from 'src/services'

import { mapGetters, mapActions } from 'vuex'


export default {
  name: "Discover",
  props: ['props.'],
  components: {
    publication,
  },
  data() {
    return {
      publications: [
      ],
      skeletons: [1,2,3,4,5,6,7,8,9,10],
      isLoading: true,
      showPublishSecretModal: false,
      citySearchValue: '',
      citySelected: {},
      citiesNotFound: false,
      isLoadingCities: false,
      activeCitiesHot: ["1"],
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
  },
  computed: {
    ...mapGetters('User', ['selectedCity'])
  },
  watch: {
    citySearchValue(newCityValue) {
      if (!newCityValue) {
        this.restoreSelectedCity()
        this.fetchPublications()
      }
    },
  },
  methods: {
    ...mapActions('User', ['selectCity']),
    restoreSelectedCity() {
      this.citiesSearchFound = []
      this.citySearchValue = ''
      this.citySelected = {}

      this.selectCity({})
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