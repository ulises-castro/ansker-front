<template lang="html">
  <section>
    sadfasdf
    <div @click="checkLoginState" class="">
      Login with facebook
    </div>
    <!-- <fb:login-button
      scope="public_profile,email"
      onlogin="checkLoginState();">
    </fb:login-button> -->
  </section>
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

<style lang="scss" scoped>
</style>
