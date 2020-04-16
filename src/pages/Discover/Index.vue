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
        v-if="isLoadingCities"
        slot="left-icon"
      />
      <div slot="action" @click="citiesSearchFound = []">Cerrar</div>
    </van-search>
    <aside v-if="citiesSearchFound.length" class="width100 q-px-md">
      <div
        v-for="(city, index) in citiesSearchFound"
        :key="index"
        @click="updateCitySelected(city)"
        class="p10 cities"
        style="background: white"
      >
        {{ city.name }} -
        {{ city.countryName }} {{ city.flag }}
      </div>
    </aside>
    <section class="publications q-pt-md" style="padding-bottom: 55px">

    <div style="position: sticky; bottom: 0; z-index: 1000">
      <q-fab
        class="q-btn–fab-mini"
        icon="las la-feather-alt"
        direction="up"
        color="primary"
      >
        <q-fab-action color="primary" icon="person_add" />
        <q-fab-action color="primary" icon="mail" />
      </q-fab>
    </div>
      <div v-if="publications.length">
        <div v-for="publication in publications" :key="publication.id">
          <publication :publication="publication"></publication>
        </div>
      </div>

      <div v-else>
        <q-card v-for="skeleton in skeletons" :key="skeleton" flat bordered square >
          <q-skeleton height="250px" square animation="fade">
            <div style="height: 180px">
              <div class="row justify-end q-px-sm">
                <q-icon name="las la-ellipsis-h" color="grey-1" class="q-mr-sm" size="25px" />
              </div>
            </div>
            <div class="q-pa-sm row items-center justify-between no-wrap full-width" style="position: absolute; bottom: 0">
              <div class="row items-center">
                <q-icon name="las la-hourglass-half" color="grey-1" class="q-mr-sm" size="20px" />
                <q-skeleton type="text" width="30px" />
              </div>

              <div class="row items-center">
                <q-icon name="las la-comments" color="grey-1" class="q-mr-sm" size="20px" />
                <q-skeleton type="text" width="30px" />
              </div>

              <div class="row items-center">
                <q-icon name="ti-heart" color="grey-1" class="q-mr-sm" size="20px" />
                <q-skeleton type="text" width="30px" />
              </div>
            </div>

          </q-skeleton>
        </q-card>
      </div>
    </section>

  </section>
</template>
<script>
import Publication from 'src/components/Publication'
import { City } from 'src/services'

export default {
  name: "Discover",
  props: ['handlerError'],
  components: {
    Publication,
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
    this.fetchPublications()
  },
  mounted() {
    const publications = [
        {
          id: 1,
          content: 'Hay mas casos de coronavirus de ha dicho el gobierno!!!',
          likes: {},
          image: 'https://ichef.bbci.co.uk/news/410/cpsprodpb/823A/production/_111083333_060312069-1.jpg'
        },
        {
          id: 2,
          content: 'Un vecino tiene coronavirus, cuidense!',
          likes: {},
          image: 'https://static01.nyt.com/images/2020/02/15/business/17coronavirus-lockdownES-1/15china-tracking-1-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
        },
        {
          id: 3,
          content: 'Un vecino tiene coronavirus, cuidense!',
          likes: {},
          image: 'https://static01.nyt.com/images/2020/02/15/business/17coronavirus-lockdownES-1/15china-tracking-1-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
        },
    ]
    setTimeout(() => this.publications = publications, 2000)
  },
  methods: {
    updateCitySelected(city) {
      this.citySelected = city;
      this.citySearchValue = city.name;
      this.citiesSearchFound = [];
    },
    async fetchPublications() {
      // const publications = await Publication.getAllByCity()
    },
    async onSearchCity() {
      const { citySearchValue } = this

      if (citySearchValue.length < 3) return

      clearTimeout(this.timerLoading)
      this.isLoadingCities = true

      const [err, citiesData] = await City.searchCity(citySearchValue)

      if (err) return handlerError(err)

      const { cities } = citiesData.data

      this.citiesSearchFound = cities

      this.timerLoading = setTimeout(() => (this.isLoadingCities = false), 800)
    }
  }
}
</script>
<style lang="scss" scoped>
.publications {}

.cities {
  font-size: 0.9em;
  padding: 5px;
}
</style>