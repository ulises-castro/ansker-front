<template lang="html">
  <container>
    <section class="container is-fluid p-t-20">
      <aside class="is-size-4 has-text-white p-b-20">
        <h3 v-t="'home.welcome_message'"></h3>
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
        <span
          v-t="{
              path: 'login.social_button',
              args: { name: 'facebook' }
            }"
          class="is-size-5">

        </span>
        <spinner :isLoading="login.isLoading" />
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
          <span v-t="'home.what_is_ansker'"> </span>
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
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    HomeAboutAnsker,
  },
  data() {
    return {
      aboutAnskerMe: false,
      login: {
        isLoading: false,
      }
    }
  },
  created() {
    console.log(process.env.VUE_APP_API, 'hola');
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
        this.login.isLoading = true;

        if (response.authResponse) {
          const tokenFB = response.authResponse.accessToken

          const data = {
            tokenFB,
          };

          this.callUserLogin(data);

        } else {
          this.login.isLoading = false;

          this.$toast.open({
              duration: 3000,
              message: this.$t('user_cancel_login'),
              position: 'is-top',
              type: 'is-danger'
          });
        }
      },
      {
        scope: 'email, user_friends'
      });
    },
    async callUserLogin(data) {
      const response = await axios.post('http://localhost:3000/api/login',
      data)

      this.login.isLoading = false;

      console.log(response, "response");
      if (response && response.log) {
        this.login.isLoading = false;
        this.$router.push({ name: 'Discover' });
      } else {
        this.$toast.open({
          duration: 3000,
          message: this.$t('failed_token'),
          position: 'is-top',
          type: 'is-danger'
        });
      }

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
