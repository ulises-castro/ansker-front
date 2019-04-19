<template lang="html">
  <section class="parent-container">
    <slot></slot>
    <Menu></Menu>
  </section>
</template>

<script>
import Menu from './Menu';

export default {
  name: 'ContainerApp',
  data() {
    return {}
  },
  components: {
    Menu,
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
