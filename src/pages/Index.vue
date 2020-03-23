<template>
  <container :showFooter="showFooter">
    hola
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
.container {
  background: 
}
</style>
