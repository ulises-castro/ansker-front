<template lang="html">
  <container>
    <section class="container is-fluid">
      <div  class="is-size-4 has-text-white">
        Comparte lo que piensas de forma anónima.
      </div>

      <div
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
      </div>

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
        console.log(response);
        // statusChangeCallback(response);
        FB.login();
      });
    }
  }
}
</script>
<style lang="scss" scoped

  .facebook-f {
  }

</style>
