<template lang="html">
  <container>
    <section class="container">
      sadfasdf
      <div @click="checkLoginState" class="">
        Login with facebook
      </div>

      <font-awesome
        :icon="['fas', 'abacus']">
      </font-awesome>

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
