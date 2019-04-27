<template lang="html">
  <header class="header p-t-5">
    <span class="logo">Ansker:)</span>
  </header>
</template>

<script>
export default {
  name: 'HeaderApp',
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.header {
  // border-bottom: 2px solid #e4e4e4;
  background: white;
  border-bottom: 1px solid #e4e4e4;
}

.logo {
  font-size: 30px;
  color: $primary;
  font-weight: bold;
  font-family: 'Marck Script', cursive;
}

</style>
