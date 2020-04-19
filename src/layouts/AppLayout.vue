<template>
  <section class="header-container">
    <!-- <HeaderApp :showBackButton="showBackButton"></HeaderApp> -->
    <van-nav-bar
      :title="title"
      fixed
      class="header-bar"
      left-text="Regresar"
      @click-left="toggleNotifications"
      :left-arrow="showBackButton"
    >
      <div
        v-if="!showBackButton"
        class="row justify-center"
        slot="left">
        <van-icon color="#49AFC4" :size="22" info="30" name="bullhorn-o" />
      </div>

      <div class="row justify-center" slot="right">
        <van-icon color="#49AFC4" v-if="showBackButton" :size="22" name="bullhorn-o" />
        <van-icon color="#49AFC4" v-else @click="goPublish" :size="24" name="edit" />
      </div>

      <div slot="title" style="padding-top: 8px">
        <img width="100" src="statics/white-logo.png" />
      </div>
    </van-nav-bar>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "app-layout",
  data() {
    return {};
  },
  methods: {
    goPublish() {
      // Implement to
    },
    toggleNotifications() {}
  },
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
  }
};
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
