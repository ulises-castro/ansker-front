<template>
  <div id="q-app">
    <app-layout></app-layout>
    <!-- TODO: add condition which only allow user logged in the app -->
    <router-view />

    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "components/Menu.vue";

export default {
  name: "App",
  components: { Menu }
};
</script>
<style lang="scss" scoped>
</style>
