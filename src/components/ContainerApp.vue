<template lang="html">
  <section class="parent-container">
    <!-- <b-loading
      :is-full-page="isFullPage"
      :active.sync="isLoading">
    </b-loading>
     -->
    <!-- <HeaderApp :showBackButton="showBackButton"></HeaderApp> -->

    <van-nav-bar
      :title="title"
      left-text="Back"
      class="headerBar"
      right-text="Button"
      :left-arrow="showBackButton"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      >
      <van-icon class="is-size-5" name="edit" slot="right" />
      <span slot="title"> Ansker:) </span>
      </van-nav-bar>
    <slot></slot>
    <Menu></Menu>
  </section>
</template>

<script>
import Menu from './Menu';
import HeaderApp from './HeaderApp';

export default {
  name: 'container-app',
  data() {
    return {}
  },
  watch: {
    isLoading() {
      if (this.isLoading) {
        this.$toast.loading({
          mask: true,
          message: 'Cargando...'
        });
      }
    }
  },
  mounted() {
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
  components: {
    Menu,
    HeaderApp,
  }
}
</script>

<style lang="scss">
@import '@/styles/main.scss';
  .parent-container {
    min-height: 100%;
    height: auto;
    width: 100%;
    background: #F7F7F7;
  }

  .headerBar {
    .van-nav-bar__title {
      font-size: 22px;
      color: $primary;
      font-weight: bold;
      font-family: 'Marck Script', cursive;
    }
  }
</style>
