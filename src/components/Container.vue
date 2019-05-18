<template lang="html">
  <div class="parent-container p-15 p-t-0">
    <HeaderComponent></HeaderComponent>
      <slot></slot>
    <!-- <FooterComponent v-if="showFooter"></FooterComponent> -->
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
  },
  props: {
    showFooter: {
      type: Boolean,
      default: true,
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';

  .parent-container {
    min-height: 100%;
    width: 100%;
    max-width: 100%;
    background: $primary;
    // background: #01b9ff;
  }
</style>
