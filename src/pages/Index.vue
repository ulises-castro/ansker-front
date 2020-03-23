<template>
  <container :showFooter="showFooter">
    <section class="container p-t-0">
      <aside class="is-size-4 has-text-white p-b-20">
        <h3 v-t="'home.welcome_message'" class="is-size-6 has-text-weight-bold p0-10"></h3>
      </aside>

      <aside class="button-container-home columns is-multiline">
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
          class="p-10" style="margin: 0 auto;">
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
      <aside class="secrets-container width100"
      :style="[{ 'padding-bottom: 0px !important': !secrets.length }]">
      </aside> -->
      <div class="columns is-multiline">
        <div
          class="secret column is-full-mobile is-half-tablet is-one-quarter-desktop p0" v-for="secret in secrets">
            <Secret
              @openShowJoinUs="openShowJoinUs" 
              :secret="secret" />
        </div>
      </div>

      <van-popup
        class="social-container flex flex-center flex-wrap p-t-15"
        v-model="showJoinUs"
        :overlay="true">
        <h3 class="logo"> Ansker:) </h3>
        <small
          class="has-text-weight-bold p10 p-b-15 p-t-0 is-size-5" style="color: #363636">
          Comparte con tu alrededor de forma anónima
        </small>
          <a
            :href="googleUrl"
            @click="checkLoginState"
            class="
              has-bg-google
              has-text-white
              flex
              flex-middle
              p-10
              is-pointer
              m-b-5
              border-5
            ">
            <div
              v-if="!login.isLoading.google"
              class="p0-10 p-r-15">
              <i class="fab fa-google is-size-5 p-t-5"></i>
            </div>
            <spinner 
              v-else
              :isLoading="true" />
            <span
              v-t="{
                  path: 'login.social_button',
                  args: { name: 'Google' }
                }"
              class="is-size-5" style="font-weight: none !important">
            </span>
          </a>
          <button
            v-if="!isIphoneDevice"
            @click="checkLoginState"
            class="
              has-bg-facebook
              has-text-white
              flex
              flex-middle
              p-10
              is-pointer
              border-5
            ">
            <div
              v-if="!login.isLoading.facebook"
              class="p0-10 p-r-15">
              <i class="fab fa-facebook-f is-size-4 p-t-5"></i>
            </div>
            <spinner
              v-else
              :isLoading="true" />
            <span
              v-if="!login.isLoading.facebook"
              v-t="{
                  path: 'login.social_button',
                  args: { name: 'Facebook' }
                }"
              class="is-size-5">
            </span>
          </button>
          <aside
            class="p15" style="line-height: initial">
            <small
              class="m-p-10"
              >
              Al unirte, aceptas nuestros
              <br>
              <a
                href="/terms" target="_blanket">
                Términos
              </a> y
              <a
                href="/policies" target="_blanket">
                Políticas de privacidad
              </a>
            </small>
          </aside>
      </van-popup>
    </section>
  </container>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      showFooter: true,
      login: {
        isLoading: {
          facebook: false,
          google: false,
        }
      }
    }
  }
}
</script>
