<template lang="html">
  <container>
    <section class="container is-fluid p-t-20">
      <aside class="is-size-4 has-text-white p-b-20">
        Comparte secretos de forma anónima.
      </aside>

      <aside
        @click="checkLoginState"
        class="
          has-bg-facebook
          has-text-white
          flex
          flex-center
          flex-middle
          p-10
          is-pointer
        ">
        <icon scale="1.8" class="m-r-15" name="brands/facebook"/>
        <span class="is-size-5">
          Continuar con facebook
        </span>
      </aside>

      <aside class="p-t-10">
        <a class="is-inverted" to="#"> Ver más </a>
      </aside>

    </section>
  </container>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  methods: {
    checkLoginState() {
      FB.getLoginStatus(function(response) {
        console.log(response, 'hola');
        // statusChangeCallback(response);
        // FB.login();
      });
    }
  }
}
</script>
<style lang="scss" scoped

  .facebook-f {
  }

</style>
