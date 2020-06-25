<template>
  <section class="header-container">
    <van-nav-bar
      :title="title"
      fixed
      class="header-bar"
      left-text="Regresar"
      @click-left="toggleNotifications"
      :left-arrow="showBackButton"
      style="z-index: 101"
    >
      <div
        v-if="!showBackButton"
        class="row justify-center"
        slot="left">
      </div>

      <div class="row justify-center" slot="right">
        <van-icon color="#49AFC4" v-if="showBackButton" :size="22" name="bullhorn-o" />
        <van-icon color="#49AFC4" v-else @click="goPublish" :size="28" name="edit" />
      </div>

      <div slot="title" style="padding-top: 8px; font-size: 2rem; font-weight: 600">
        <!-- {{ currentViewName }} -->
        <img width="100" src="statics/white-logo.png" />
      </div>
    </van-nav-bar>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "app-layout",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isFullPage: {
      type: Boolean,
      default: false
    },
    showBackButton: {
      type: Boolean,
      default: false
    },
    title: {
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    currentViewName() {
      // console.log(this.$route)
      return this.$route.name
    }
  },
  methods: {
    goPublish() {
      // TODO: fix this because publish isnt detect Implement to
      this.$router.push({ name: 'Publish'})
    },
    hideMenu() {
    },
    toggleNotifications() {},
  },
  mounted() {
    console.log(this.$route.name)
  },
}
</script>
<style lang="scss" scoped>

.header-container {
  z-index: 1000;

  .header-bar {
    .van-nav-bar__title {
      color: $primary;
      font-weight: bold;
      font-size: 1.5rem;
      font-family: "MarckScript";
    }
  }
}
</style>
