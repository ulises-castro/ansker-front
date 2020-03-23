<template>
  <container class="block window-height window-width bg-primary" :showFooter="showFooter">

    <h3 class="logo-font q-mt-none text-white text-weight-bold">Ansker;)</h3>
  </container>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      showFooter: true,
      login: {
        isLoading: {
          facebook: false,
          google: false,
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
