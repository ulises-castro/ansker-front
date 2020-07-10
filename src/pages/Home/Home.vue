<template>
  <section class="block window-height window-width bg-primary" :showFooter="showFooter">
    <section class="q-py-lg">
      <div class="full-width row justify-center">
        <img width="300" src="statics/main-logo.png" />
      </div>
      <p
        class="text-center slogan text-weight-bold text-white"
      >Comparte lo que piensas con tu alrededor de manera anónima o publica.</p>
    </section>
    <section class="row justify-center q-px-sm">
      <van-button
        @click="openJoinUs = true"
        round
        type=" join-button bg-white text-primary text-weight-bold no-border q-mx-sm"
        size="large"
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

    <joinUs :openJoinUs="openJoinUs"></joinUs>

    <section></section>
  </section>
</template>
<script>
import joinUs from 'components/JoinUs.vue'

export default {
  name: "Home",
  components: {
    joinUs
  },
  data() {
    return {
      showFooter: true,
      openJoinUs: false,
    }
  },
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
