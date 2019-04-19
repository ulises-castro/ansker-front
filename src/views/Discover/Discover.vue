<template lang="html">
  <containerApp>
    <section class="container is-fluid p-t-20">
      <span class="logo">Ansker:)</span>
    </section>
  </containerApp>
</template>
<script>
export default {
  name: 'Discover',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';

.logo {
  font-size: 30px;
  color: $primary;
  font-weight: bold;
  font-family: 'Marck Script', cursive;
}
</style>
