<template lang="html">
  <section class="parent-container">
    <HeaderApp></HeaderApp>
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
  components: {
    Menu,
    HeaderApp,
  }
}
</script>

<style lang="scss">
@import '@/styles/main.scss';
  .parent-container {
    height: 100%;
    width: 100%;
    background: #F7F7F7;
  }
</style>
