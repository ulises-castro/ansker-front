<template>
  <van-popup
    round
    position="bottom"
    :style="{ height: '40%' }"
    class="row wrap justify-center"
    v-model="openJoinUs"
    :overlay="true">
    <div class="row items-center">
      <span
        class="logo-font text-primary text-weight-bolder text-center q-my-none q-py-sm text-h5"
      >Ansker:)</span>
    </div>
    <small
      class="full-width text-center text-weight-bold text-subtitle"
      style="color: #363636"
    >Comparte con tu alrededor de forma anónima</small>
    <a
      :href="googleLoginUrl"
      class="full-width no-border bg-red-8 has-text-white row justify-center items-center cursor-pointer"
    >
      <span class="text-h6 text-white text-weight-bold">Continuar con Google</span>
    </a>
    <a
      @click="checkLoginState"
      class="full-width bg-blue-10 no-border has-text-white row justify-center items-center cursor-pointer"
    >
      <span class="text-h6 text-white text-weight-bold">Continuar con Facebook</span>
    </a>
    <aside class="q-py-sm row items-center">
      <small class="text-weight-bold text-subtitle text-grey-9">
        Al unirte, aceptas nuestros
        <a
          class="text-primary"
          href="/terms"
          target="_blanket"
        >
          Términos
        </a> y
        <a class="text-primary"
        href="/policies" target="_blanket">
          Políticas de privacidad
        </a>
      </small>
    </aside>
  </van-popup>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

import User from 'src/services/UserService'
import { Auth } from "src/services"

export default {
  name: 'joinUs',
  props: ['openJoinUs'],
  data() {
    return {
      showFooter: true,
      googleLoginUrl: Auth.getGoogleLink(),
    }
  },
  computed: {
    ...mapGetters('User', [
      'pushToken'
    ])
  },
  methods: {
    ...mapActions('User', [
      'login'
    ]),
    checkLoginState() {
      this.auth.isLoading.facebook = true

      this.openLoginFB()
    },
    openLoginFB() {
      FB.login((response) => {

        if (response.authResponse) {
          const tokenFB = response.authResponse.accessToken

          this.loginWithFacebook(tokenFB)
        } else {
          this.auth.isLoading = false

          this.$notify('Necesitamos permisos para poder continuar')
        }
      },{
        scope: 'public_profile, email'
      })
    },
    async loginWithFacebook(tokenFB) {
      this.auth.isLoading.facebook = false

      const [err, facebookUser] = await Auth.signInFacebook(tokenFB)

      if (err || !facebookUser) return this.$notify('Ocurrio un error, intentalo más tarde')

      this.$notify({ type: 'success', message: 'Welcome to Ansker' })

      this.login(facebookUser.data.token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${facebookUser.data.token}`

      this.$router.push({ name: 'Discover' })
    },
  }
}

</script>