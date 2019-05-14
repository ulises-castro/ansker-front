<template lang="html">
  <div
      class="footer-container width100 has-text-white p-20">
      Al utilizar Ansker.me aceptas nuestro
      <br>
      <a
        class="has-text-white has-text-weight-bold"
        target="_blank"
        href="https://www.ansker.me/terms">
        Términos y Condiciones y 
      </a>
      <a
        class="has-text-white has-text-weight-bold"
        target="_blank"
        href="https://www.ansker.me/policies">
        Aviso de Privacidad
      </a>
    </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style lang="scss" scoped>
.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
