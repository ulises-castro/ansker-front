<template>
  <div id="q-app">
    <app-layout v-if="isLogged"></app-layout>
    <!-- TODO: add condition which only allow user logged in the app -->
    <router-view :handlerError="handlerError" />

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
    handlerError(err) {
      if (err.response.data.message) {
        return this.$notify(`${err.response.data.message}`)
      }

      return this.$notify(`No pudimos procesar tu solitud, por favor intente más tarde`)
    }
  },
  created() {
    // TODO: Check if useful this piece of code otherwise remove it
    let installPrompt;

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      installPrompt = e
      this.installAlert = "block"
    })

    this.installer = () => {
      this.installAlert = 'none'
      installPrompt.prompt()

      installPrompt.userChoice.then(result => {
        if (result.outcome === 'accepted') {
          console.log('user accepted')
        } else {
          console.log('user denied')
        }

        installPrompt = false
      })
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '273084363581374',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });

      FB.AppEvents.logPageView();

      window.FB = FB;
    };

    (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  },
};
</script>
<style lang="scss" scoped>
</style>
