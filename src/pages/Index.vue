<template>
  <section class="block window-height window-width bg-primary" :showFooter="showFooter">
    <section class="q-py-lg">
      <h4
        class="logo-font q-py-lg q-my-none text-white text-weight-bold text-center logo-font-title"
      >Ansker;)</h4>
      <p
        class="text-center slogan text-weight-bold text-white"
      >Comparte lo que piensas con tu alrededor de manera anónima.</p>
    </section>
    <section class="row justify-center q-px-sm">
      <van-button
        @click="openJoinUs = true"
        round
        type=" join-button bg-white text-primary text-weight-bold no-border"
        size="large"
        :loading="
          login.isLoading.google ||
          login.isLoading.facebook"
        loading-text="Iniciando sesión..."
      >
        <span class="text-h5 text-weight-bolder">Unirme</span>
      </van-button>
    </section>
    <van-popup
      round
      position="bottom"
      :style="{ height: '40%' }"
      class="row wrap justify-center"
      v-model="openJoinUs"
      :overlay="true"
    >
      <h5 class="logo-font text-primary text-weight-bolder text-center q-my-none q-py-md">Ansker:)</h5>
      <small
        class="full-width text-center text-weight-bold text-subtitle"
        style="color: #363636"
      >Comparte con tu alrededor de forma anónima</small>
      <button
        :href="googleUrl"
        class="full-width no-border bg-red-8 has-text-white row justify-center items-center cursor-pointer"
      >
        <div v-if="!login.isLoading.google" class="p0-10 p-r-15">
          <i class="fab fa-google is-size-5 p-t-5"></i>
        </div>
        <span class="text-h6 text-white text-weight-bold">Continuar con Google</span>
      </button>
      <button
        class="full-width bg-blue-10 no-border has-text-white row justify-center items-center cursor-pointer"
      >
        <div v-if="!login.isLoading.facebook" class="p0-10 p-r-15">
          <i class="fab fa-facebook-f is-size-4 p-t-5"></i>
        </div>
        <spinner v-else :isLoading="true" />
        <span class="text-h6 text-white text-weight-bold">Continuar con Facebook</span>
      </button>
      <aside class="q-py-sm row items-center">
        <small class="text-weight-bold text-subtitle text-indigo-9">
          Al unirte, aceptas nuestros
          <a
            class="text-primary"
            href="/terms"
            target="_blanket"
          >Términos</a> y
          <a class="text-primary" href="/policies" target="_blanket">Políticas de privacidad</a>
        </small>
      </aside>
    </van-popup>
    <section></section>
  </section>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      showFooter: true,
      openJoinUs: false,
      googleUrl: `${process.env.VUE_APP_API}/request/gmail/auth`,
      login: {
        isLoading: {
          facebook: false,
          google: false
        }
      }
    };
  }
};
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
