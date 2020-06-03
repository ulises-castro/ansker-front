<template>
  <section class="block window-height window-width bg-primary" :showFooter="showFooter">
    <section class="q-py-lg">
      <div class="full-width row justify-center">
        <img width="300" src="statics/main-logo.png" />
      </div>
      <p
        class="text-center slogan text-weight-bold text-white"
      >Comparte lo que piensas con tu alrededor de manera anónima.</p>
    </section>
    <section class="row justify-center q-px-sm">
      <van-button
        @click="openJoinUs = true"
        round
        type=" join-button bg-white text-primary text-weight-bold no-border q-mx-sm"
        size="large"
        :loading="
          auth.isLoading.google ||
          auth.isLoading.facebook"
        loading-text="Iniciando sesión..."
      >
        <span class="text-h5 text-weight-bolder">Unirme</span>
      </van-button>
      <div 
        @click="openJoinUs = true"
        class="full-width q-pa-md text-center cursor-pointer">
        <u class="text-white text-weight-bold" style="font-size: 1.2em cursor-pointer">Ingresar</u>
      </div>
    </section>
    <van-popup
      round
      position="bottom"
      :style="{ height: '40%' }"
      class="row wrap justify-center"
      v-model="openJoinUs"
      :overlay="true"
    >
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
        <van-loading
          v-if="auth.isLoading.facebook"
          color="#fff"
          size="1em"
        />
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
    <section></section>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { Auth } from "src/services"

export default {
  name: "Home",
  data() {
    return {
      showFooter: true,
      openJoinUs: false,
      googleLoginUrl: Auth.getGoogleLink(),
      auth: {
        isLoading: {
          facebook: false,
          google: false
        }
      }
    }
  },
  created() {
  },
  methods: {
    ...mapActions('User',[
      'login',
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

      if (err || !facebookUser.data) return this.$notify('Ocurrio un error, intentalo más tarde')

      this.$notify({ type: 'success', message: 'Welcome to  Ansker' })

      this.login(facebookUser.data.token)

      this.$router.push({ name: 'Discover' })
    },
  }
}
</script>
<style lang="scss" scoped>
.logo-font-title {
  font-size: 5em;
}

.slogan {
  font-size: 1.2em;
}

.join-button {
  max-width: 400px;
}

.social-container {
  min-width: 330px;
  max-width: 500px;

  .has-bg-facebook,
  .has-bg-google {
    width: 90%;
    border: none;
  }
}
</style>
