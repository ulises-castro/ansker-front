<template lang="html">
  <section class="parent-container">
    <b-loading
      :is-full-page="isFullPage"
      :active.sync="isLoading">
    </b-loading>
    <HeaderApp :showBackButton="showBackButton"></HeaderApp>
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
    }
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
</style>
