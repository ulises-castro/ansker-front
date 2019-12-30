<template lang="html">
  <container-app :isLoading="isLoading">

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
      v-if="isLoadingCities" slot="left-icon" />
      <div
        slot="action"
        @click="citiesSearchFound = []">Cerrar</div>
    </van-search>
    <aside
      v-if="citiesSearchFound.length"
      class="width100">
      <div
        v-for="(city, index) in citiesSearchFound"
        :key="index"
        @click="updateCitySelected(city)"
        class="p10" style="background: white">
        {{ city.name }} -
         {{ city.countryName }} {{ city.flag }}
        </div>
    </aside>

    <section
      :is-full-page="isLoading" ref="section" class="container is-fluid height100">

      <aside class="secrets-container"
      :style="[{ 'padding-bottom: 0px !important': !secrets.length }]">
        <div class="secret" v-for="secret in secrets">
          <Secret :secret="secret" />
        </div>
      </aside>
    </section>
  </container-app>
</template>
<script>
import axios from "axios";
import Menu from "@/components/Menu";
import Secret from "@/components/Secret";
import { get, post } from "@/api";

export default {
  name: "Discover",
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
      publishMessage: "",
      showShareAdvice: this.$store.getters.showShareAdvice,
      authorizedGeolocation: this.$store.getters.authorizedGeolocation,
      timerLoading: ""
    };
  },
  components: {
    Menu,
    Secret
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    customEmit(val) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        val
      );
    }
  },
  watch: {
    citySearchValue(value) {
      if (!value) {
        this.citiesSearchFound = [];
      }
    }
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
    },
    updateCitySelected(city) {
      this.citySelected = city;
      this.citySearchValue = city.name;
      this.citiesSearchFound = [];
    },
    showPublishSecret() {
      this.$router.push({ name: "PublishSecret" });
    },
    async asyncFetchPublications() {
      const { data } = await get("secret/allByCity", {});

      this.isLoadingSecrets = false;
      this.secrets = data.secrets;
    }
  },
  created() {},
  mounted() {
    this.asyncFetchPublications();
    console.log(this.$store.getters["entities/userData/all"]());
  },
  metaInfo: {
    // Children can override the title.
    title: "Publicaciones cerca de ti"
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/main.scss";

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
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
    // border: 1px solid darken($light, 5%);
  }

  .card-content {
  }

  button {
    font-size: 15px;
  }
}
</style>
