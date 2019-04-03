<template lang="html">
  <div class="parent-container">
    <HeaderComponent></HeaderComponent>
      <slot></slot>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

export default {
  name: 'Container',
  components: {
    HeaderComponent,
    FooterComponent,
  }
}
</script>
<style lang="scss" scoped>
@import '@/main.scss';

  .parent-container {
    height: 100%;
    width: 100%;
    background: $primary;
    // background: #01b9ff;
  }
</style>
