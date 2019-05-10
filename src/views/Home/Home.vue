<template lang="html">
  <container>
    <section class="container is-fluid p-t-20">
      <aside class="is-size-4 has-text-white p-b-20">
        <h3 v-t="'home.welcome_message'"></h3>
      </aside>

      <aside class="">
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
          <b-icon
            class="m-r-15"
            icon="facebook-f"
            style="font-size: 20px"
            pack="fab"/>
          <span
            v-t="{
                path: 'login.social_button',
                args: { name: 'facebook' }
              }"
            class="is-size-5">
          </span>
          <spinner :isLoading="login.isLoading" />
        </aside>
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
import { post, get } from '@/api';

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
    console.log(process.env.VUE_APP_API, 'API!');
  },
  methods: {

    checkLoginState() {
      const self = this;

      this.login.isLoading = true;

      FB.getLoginStatus(function(response) {
        console.log(response, 'hola');
        // statusChangeCallback(response);
        self.openLoginFB();
      });
    },
    openLoginFB() {
      FB.login((response) => {

        if (response.authResponse) {
          const tokenFB = response.authResponse.accessToken

          const data = {
            tokenFB,
          };

          this.handlerLoginRequest(data);
        } else {
          this.login.isLoading = false;
          this.showLoginError();
        }
      },
      {
        scope: 'email'
      });
    },
    handlerLoginRequest(data) {
      this.login.isLoading = false;

      this.callUserLogin(data)
        .catch((err) => {
          this.showLoginError();
          console.log(err);
      });
    },
    showLoginError() {
      this.$toast.open({
        duration: 3000,
        message: this.$t('login.error.failed_token'),
        position: 'is-top',
        type: 'is-danger'
      });
    },
    async callUserLogin(params) {
      let { data } = await post('login', params);

      let user = { ...data };
      const { token } = data;

      // Consider implement models with orm
      // this.$store.dispatch('entities/userData/create', { data });

      this.$store.dispatch('login', { token, user });
      this.login.isLoading = false;

      this.$router.push({ name: 'Discover' })
    },
    handleCatchError() {

    },
    goToAboutAnsker() {
      // this.aboutAnskerMe = true;
    },
  }
}
</script>
<style lang="scss" scoped
</style>
