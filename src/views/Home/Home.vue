<template lang="html">
  <container :showFooter="showFooter">
    <section class="container p-t-0">
      <aside class="is-size-4 has-text-white p-b-20">
        <h3 v-t="'home.welcome_message'" class="is-size-6 has-text-weight-bold p0-10"></h3>
      </aside>


      <aside class="button-container-home columns is-multiline">
        <!-- <div class="column is-full p-0 p-t-5 p-r-10 p-l-10">
          <van-button
            @click="showJoinUs = true"
            round
            type="main-button is-color-primary is-size-5 has-text-weight-bold"
            size="large"
            :loading="login.isLoading"
            loading-text="Iniciando sesión...">
            Iniciar sesión
          </van-button>
        </div> -->
        <div class="column is-full p-0 p-r-10 p-l-10">
          <van-button
            @click="showJoinUs = true"
            round
            type="main-button is-color-primary is-size-5 has-text-weight-bold m-t-10"
            size="large"
            :loading="
              login.isLoading.google ||
              login.isLoading.facebook"
            loading-text="Iniciando sesión...">
            Unirme
          </van-button>
        </div>
        <div
          @click="showJoinUs = true"
          class="p-10 p-">
          <h4 class="has-text-weight-bold is-text-underline has-text-white is-size-6 is-underline is-cursor-pointer has-text-centered">
            Ya tengo una cuenta
          </h4>
        </div>
      </aside>

      <aside
        class="flex flex-center flex-middle p-t-20">
        <a
          class="
          button is-white is-pointer
          is-color-primary
          has-text-weight-bold has-text-primary has-background-secondary is-rounded
          p-20 is-size
          "
          @click="goToAboutAnsker">
          <span v-t="'home.what_is_ansker'"> </span>
        </a>
      </aside>

      <aside v-show="aboutAnskerMe" class="">
        <HomeAboutAnsker/>
      </aside>

      <h3 class="has-text-weight-bold has-text-white is-size-4 p20-0 p30-0">
        Últimas publicaciones
      </h3>
<!-- 
      <aside class="secrets-container width100"
      :style="[{ 'padding-bottom: 0px !important': !secrets.length }]">
      </aside> -->
      <div class="columns is-multiline">
        <div
          class="secret column is-full-mobile is-half-tablet p0" v-for="secret in secrets">
            <Secret
              @openShowJoinUs="openShowJoinUs" :secret="secret" />
        </div>
      </div>

      <van-popup
        class="social-container"
        v-model="showJoinUs"
        :overlay="true">
        <h3 class="has-text-weight-bold p10 is-color-primary">
        </h3>
        <aside class="
          columns
          is-multiline
          m-b-10">
          <aside
            @click="checkLoginState"
            class="
              column
              has-bg-google
              has-text-white
              flex
              flex-center
              flex-middle
              p-10
              is-pointer
              m-b-5
              border-5
            ">
            <b-icon
              class="m-r-15"
              icon="facebook-f"
              style="font-size: 20px"
              pack="fab"/>
            <span
              v-t="{
                  path: 'login.social_button',
                  args: { name: 'Google' }
                }"
              class="is-size-5">
            </span>
            <spinner :isLoading="login.isLoading" />
          </aside>
          <aside
            @click="checkLoginState"
            class="
              column
              has-bg-facebook
              has-text-white
              flex
              flex-center
              flex-middle
              p-10
              is-pointer
              border-5
            ">
            <b-icon
              class="m-r-15"
              icon="facebook-f"
              style="font-size: 20px"
              pack="fab"/>
            <span
              v-t="{
                  path: 'login.social_button',
                  args: { name: 'Facebook' }
                }"
              class="is-size-5">
            </span>
            <spinner :isLoading="login.isLoading" />
          </aside>
          <aside
            class="p-t-10" style="line-height: initial">
            <small
              class="m-p-10"
              >
              Al unirte, aceptas nuestros 
              <br>
              <a>Términos</a> y
              <a>Políticas de privacidad</a>
            </small>
          </aside>
        </aside>
      </van-popup>
    </section>
  </container>
</template>
<script>
import HomeAboutAnsker from './HomeAboutAnsker';
import { post, get } from '@/api';
import Secret from '@/components/Secret';

import axios from 'axios';

export default {
  name: 'Home',
  components: {
    HomeAboutAnsker,
    Secret,
  },
  data() {
    return {
      aboutAnskerMe: false,
      login: {
        isLoading: {
          google: false,
          facebook: false,
        }
      },
      isLoadingSecrets: true,
      showJoinUs: false,
      showFooter: true,
      secrets: [],
    }
  },
  mounted() {
    this.asyncFetchPublications();
  },
  methods: {
    openShowJoinUs() {
      this.showJoinUs = true;
    },
    async asyncFetchPublications() {
      const { data } = await get('secret/allByCity', {});

      this.isLoadingSecrets = false;
      this.secrets = data.secrets;
    },
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
      this.aboutAnskerMe = !this.aboutAnskerMe;
      this.showFooter = !this.showFooter;
    },
  }
}
</script>
<style lang="scss" scoped>

.button-container-home {
  button {
    max-width: 400px;
    background: white;
    border: none;
  }
}

.social-container {
  min-width: 330px;
  max-width: 500px;

  .has-bg-facebook, .has-bg-google {
    width: 90%;
  }
}

.has-bg-google {
  background: #be3624;
}

.border-5 {
  border-radius: 5px;
}

</style>
