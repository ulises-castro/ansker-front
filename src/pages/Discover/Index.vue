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
          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="statics/cities/mx-manzanillo.jpg"
            />
            <small class="width: 100%; is-size-7">Manzanillo</small>
          </div>

          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="statics/cities/mx-guadalajara.jpg"
            />
            <small class="is-size-7">Guadalajara</small>
          </div>

          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="statics/cities/mx-tijuana.jpg"
            />
            <small class="is-size-7">Tijuana</small>
          </div>

          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="statics/cities/mx-colima.jpg"
            />
            <small class="is-size-7">Colima</small>
          </div>
        </aside>
      </van-collapse-item>
    </van-collapse>

    <van-search
      v-model="citySearchValue"
      placeholder="Filtrar por ciudad"
      shape="round"
      :show-action="(citiesSearchFound.length)"
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
    <aside v-if="citiesSearchFound.length" class="width100">
      <div
        v-for="(city, index) in citiesSearchFound"
        :key="index"
        @click="updateCitySelected(city)"
        class="p10"
        style="background: white"
      >
        {{ city.name }} -
        {{ city.countryName }} {{ city.flag }}
      </div>
    </aside>
    <section class="publications q-pt-md">
      <div class v-for="skeleton in [1,2,3,4,5]" :key="skeleton">
        <q-card flat bordered square>
          <q-skeleton height="170px" square animation="fade" />
          <div class="q-pa-sm row items-center justify-between no-wrap">
            <div class="row items-center">
              <q-icon name="alarm" color="grey-4" class="q-mr-sm" size="18px" />
              <q-skeleton type="text" width="30px" />
            </div>

            <div class="row items-center">
              <q-icon name="chat_bubble_outline" color="grey-4" class="q-mr-sm" size="18px" />
              <q-skeleton type="text" width="30px" />
            </div>

            <div class="row items-center">
              <q-icon name="favorite_border" color="grey-4" class="q-mr-sm" size="18px" />
              <q-skeleton type="text" width="30px" />
            </div>
          </div>
        </q-card>
      </div>
    </section>
  </section>
</template>
<script>
import { QSkeleton, QCard } from "quasar";

export default {
  name: "Discover",
  components: {
    QSkeleton,
    QCard
  },
  data() {
    return {
      secrets: [],
      isLoading: true,
      showPublishSecretModal: false,
      citySearchValue: "",
      citySelected: {},
      isLoadingCities: false,
      activeCitiesHot: ["1"],
      citiesSearchFound: []
    };
  },
  methods: {
    async onSearchCity() {
      const { citySearchValue } = this;

      if (citySearchValue.length < 3) return;

      clearTimeout(this.timerLoading);
      this.isLoadingCities = true;

      const { data } = await get(`searchPlace/${citySearchValue}`);

      this.citiesSearchFound = data.cities;

      this.timerLoading = setTimeout(() => (this.isLoadingCities = false), 800);
    }
  }
};
</script>
<style lang="scss" scoped>
.publications {
}
</style>