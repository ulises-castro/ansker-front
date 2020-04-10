<template>
  <div id="q-app">
    <app-layout v-if="isLogged"></app-layout>
    <!-- TODO: add condition which only allow user logged in the app -->
    <router-view />

    <Menu v-if="isLogged"></Menu>
  </div>
</template>
<script>
import Menu from "components/Menu.vue";

import { mapGetters, mapActions } from 'vuex'

export default {
  name: "App",
  components: { Menu },
  // TODO: Added notify about need to login in
  computed: {
    ...mapGetters('User', ['isLogged'])
  },
  methods: {
    // ...mapAction('User', '')
  }
};
</script>
<style lang="scss" scoped>
</style>
