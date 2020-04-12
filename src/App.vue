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
    sendErrorsAndManagesUserLogin() {
      this.$http.interceptors.response.use(undefined, (err) => {

      // Handler error from backend
      let errorMessage = 'general.error';
      if (err.response && err.response.data) {
        errorMessage = (!err.response.data.error)
          ? 'general.' + err.response.data
          : err.response.data.error;
      }

      this.$notify({
        message: this.$t(errorMessage),
        duration: 3000,
      });

      return;
      if (err) {
         this.$store.dispatch('logout');

         this.$router.push({ name: 'Home' });
       }
     });
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

     // TODO: B Create 401 | 403 response middlare, BUG: Because whatever response code exists you will get out
     this.sendErrorsAndManagesUserLogin();
  },
};
</script>
<style lang="scss" scoped>
</style>
