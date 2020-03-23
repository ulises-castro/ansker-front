<template>
  <container class="block window-height window-width bg-primary" :showFooter="showFooter">
    <section class="q-py-lg">
      <h4 class="logo-font q-py-lg q-my-none text-white text-weight-bold text-center">Ansker;)</h4>
      <p
        class="text-center slogan text-weight-bold text-white"
      >Comparte lo que piensas con tu alrededor de manera anónima.</p>
    </section>
    <section>
      <van-button
        @click="showJoinUs = true"
        round
        type="main-button is-color-primary is-size-5 has-text-weight-bold m-t-10"
        size="large"
        :loading="
          login.isLoading.google ||
          login.isLoading.facebook"
        loading-text="Iniciando sesión..."
      >Unirme</van-button>
    </section>
    <section></section>
  </container>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      showFooter: true,
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
.logo-font {
  font-size: 5em;
}

.slong {
  font-size: 1.1em;
}
</style>
