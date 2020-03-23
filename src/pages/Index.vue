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
    <section class="row justify-center">
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
    <van-popup class v-model="showJoinUs" :overlay="true">
      <h3 class="logo-font text-primary text-weight-bolder">Ansker:)</h3>
      <small
        class="has-text-weight-bold p10 p-b-15 p-t-0 is-size-5"
        style="color: #363636"
      >Comparte con tu alrededor de forma anónima</small>
      <a
        :href="googleUrl"
        @click="checkLoginState"
        class="has-bg-google has-text-white flex flex-middle p-10 is-pointer m-b-5 border-5"
      >
        <div v-if="!login.isLoading.google" class="p0-10 p-r-15">
          <i class="fab fa-google is-size-5 p-t-5"></i>
        </div>
        <spinner v-else :isLoading="true" />
        <span
          v-t="{
                  path: 'login.social_button',
                  args: { name: 'Google' }
                }"
          class="is-size-5"
          style="font-weight: none !important"
        ></span>
      </a>
      <button
        @click="checkLoginState"
        class="has-bg-facebook has-text-white flex flex-middle p-10 is-pointer border-5"
      >
        <div v-if="!login.isLoading.facebook" class="p0-10 p-r-15">
          <i class="fab fa-facebook-f is-size-4 p-t-5"></i>
        </div>
        <spinner v-else :isLoading="true" />
        <span
          v-if="!login.isLoading.facebook"
          v-t="{
                  path: 'login.social_button',
                  args: { name: 'Facebook' }
                }"
          class="is-size-5"
        ></span>
      </button>
      <aside class="p15" style="line-height: initial">
        <small class="m-p-10">
          Al unirte, aceptas nuestros
          <br />
          <a href="/terms" target="_blanket">Términos</a> y
          <a href="/policies" target="_blanket">Políticas de privacidad</a>
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
