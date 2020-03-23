<template>
  <section class="block window-height window-width bg-primary" :showFooter="showFooter">
    <section class="q-py-lg">
      <h4 class="logo-font q-py-lg q-my-none text-white text-weight-bold text-center">Ansker;)</h4>
      <p
        class="text-center slogan text-weight-bold text-white"
      >Comparte lo que piensas con tu alrededor de manera anónima.</p>
    </section>
    <section>
      <van-button
        @click="openJoinUs = true"
        round
        type="main-button bg-primary text-weight-bold"
        size="large"
        :loading="
          login.isLoading.google ||
          login.isLoading.facebook"
        loading-text="Iniciando sesión..."
      >Unirme</van-button>
    </section>
    <section></section>
  </section>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      showFooter: true,
      openJoinUs: open,
      login: {
        isLoading: {
          facebook: true,
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

.slogan {
  font-size: 1.2em;
}
</style>
