<template>
  <div>Loading data</div>
</template>

<script>
import axios from "axios";
import AuthService from "src/services/auth.service";
import * as queryString from "query-string";

export default {
  name: "google",
  methods: {
    async init() {
      const urlParams = queryString.parse(window.location.search);

      console.log(`The code is: ${urlParams.code}`);

      const [ err, googleData ] = await AuthService.googleLogin(urlParams.code);

      console.log(err.response, googleData);
      this.$notify(`${err.response.data.message}`);

    },
    getToken() {
      const urlParams = queryString.parse(window.location.search)

      console.log(urlParams.accessToken)
      // AuthService.getToken()
    }
  },
  created() {
    this.init();
  },
  mounted() {
  }
};
</script>