<template>
  <section class="parent-container">
    <!-- <HeaderApp :showBackButton="showBackButton"></HeaderApp> -->
    <van-nav-bar
      :title="title"
      class="headerBar"
      left-text="Regresar"
      @click-left="toggleNotifications"
      :left-arrow="showBackButton"
    >
      <div v-if="!showBackButton" slot="left">
        <van-icon color="#49AFC4" :size="18" info="30" name="bullhorn-o" />
      </div>
      <div slot="right">
        <van-icon color="#49AFC4" v-if="showBackButton" :size="18" name="bullhorn-o" />
        <van-icon color="#49AFC4" v-else @click="goPublish" :size="18" name="edit" />
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
.headerBar {
  .van-nav-bar__title {
    color: $primary;
    font-weight: bold;
    font-size: 1.5rem;
    font-family: "MarckScript";
  }
}
</style>
