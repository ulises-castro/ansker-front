<template>
  <section class="parent-container">
    <!-- <HeaderApp :showBackButton="showBackButton"></HeaderApp> -->

    <van-nav-bar
      :title="title"
      class="headerBar"
      left-text="Regresar"
      @click-left="handlerActionLeft"
      :left-arrow="showBackButton"
      >
      <div v-if="!showBackButton" slot="left">
        <van-icon
          color="#49AFC4"
          class="is-size-5"
          info="30"
          name="bullhorn-o"
        />
      </div>
      <div
        slot="right"
      >
        <van-icon
          color="#49AFC4"
          v-if="showBackButton"
          class="is-size-5"
          name="bullhorn-o"
        />
        <van-icon
          color="#49AFC4"
          v-else
          @click="goPublish"
          class="is-size-5" name="edit"
        />
      </div>

      <span slot="title"> Ansker:) </span>
      </van-nav-bar>
    <slot></slot>
    <Menu></Menu>
  </section>
</template>

<script>
export default {
  name: 'AppLayout',
  data () {
    return {
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFullPage: {
      type: Boolean,
      default: false,
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    title: {
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.headerBar {
  .van-nav-bar__title {
    color: $primary;
    font-weight: bold;
    font-size: 1.5rem;
    font-family: 'MarckScript';
  }
}
</style>
