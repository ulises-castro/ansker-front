<template>
  <container :showFooter="showFooter">
    
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
<style lang="sass" scoped>

</style>
