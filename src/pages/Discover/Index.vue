<template>
  <section>
    <van-collapse
      :border="false"
      v-model="activeCitiesHot">
      <van-collapse-item
        :border="false"
        title-class="has-text-weight-bold"
        title="Ciudades hot" name="1">

        <aside
          class="flex flex-wrap space-between">
          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="@/assets/cities/mx-manzanillo.jpg" />
            <small class="width: 100%; is-size-7">
              Manzanillo
            </small>
          </div>

          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="@/assets/cities/mx-guadalajara.jpg" />
            <small class="is-size-7">
              Guadalajara
            </small>
          </div>

          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img 
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="@/assets/cities/mx-tijuana.jpg" />
            <small class="is-size-7">
              Tijuana
            </small>
          </div>

          <div class="flex flex-center flex-wrap" style="min-width: 50px; max-width: 70px">
            <img 
              style="width: 38px; height: 38px; border-radius: 50%;"
              src="@/assets/cities/mx-colima.jpg" />
            <small class="is-size-7">
              Colima
            </small>
          </div>
        </aside>
      </van-collapse-item>
    </van-collapse>
  </section>
</template>
<script>
export default {
  name: 'Discover',
  data() {
    return {
      secrets: [],
      isLoading: true,
      showPublishSecretModal: false,
      citySearchValue: "",
      citySelected: {},
      isLoadingCities: false,
      activeCitiesHot: ["1"],
      citiesSearchFound: [],
    }
  }
}
</script>