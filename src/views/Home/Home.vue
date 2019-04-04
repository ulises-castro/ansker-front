<template lang="html">
  <container>
    <section class="container is-fluid p-t-20">
      <aside class="is-size-4 has-text-white p-b-20">
        Comparte secretos de forma anónima.
      </aside>

      <aside
        @click="checkLoginState"
        class="
          has-bg-facebook
          has-text-white
          flex
          flex-center
          flex-middle
          p-10
          is-pointer
        ">
        <icon scale="1.8" class="m-r-15" name="brands/facebook"/>
        <span class="is-size-5">
          Continuar con facebook
        </span>
      </aside>

      <aside
        class="flex flex-center flex-middle p-t-100">
        <a
          class="
          button is-white is-pointer
          has-text-weight-bold has-text-primary has-background-secondary is-rounded
          p-20 is-size
          "
          @click="goToAboutAnsker">
          ¿Qué es Ansker.me?
        </a>
      </aside>

      <aside v-if="aboutAnskerMe" class="">
        <HomeAboutAnsker/>
      </aside>
    </section>
  </container>
</template>
<script>
import HomeAboutAnsker from './HomeAboutAnsker';

export default {
  name: 'Home',
  components: {
    HomeAboutAnsker,
  },
  data() {
    return {
      aboutAnskerMe: false,
    }
  },
  methods: {
    checkLoginState() {
      const self = this;
      FB.getLoginStatus(function(response) {
        console.log(response, 'hola');
        // statusChangeCallback(response);
        self.openLoginFB();
      });
    },
    openLoginFB() {
      FB.login((response) => {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
      },
      {
        scope: 'email, user_friends'
      });
    },
    goToAboutAnsker() {
      this.aboutAnskerMe = true;
    },
  }
}
</script>
<style lang="scss" scoped

  .facebook-f {
  }

</style>
