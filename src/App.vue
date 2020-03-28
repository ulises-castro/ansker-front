<template>
  <div id="q-app">
    <app-layout></app-layout>
    <!-- TODO: add condition which only allow user logged in the app -->
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  components: [
  ]
};
</script>
<style lang="scss" scoped>
</style>
