<template lang="html">
  <container-app>
    <section>
      <secret :secret="secret" />
    </section>
</container-app>
</template>
<script>
export default {
  name: 'Secret',
  data() {
    return {}
  },
  created() {
    this.fetchSecret();
  },
  methods: {
    async fetchSecret() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
