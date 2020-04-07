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

      if (urlParams.error) {
        // TODO: Implement a modal alert
        console.log(`An error occurred: ${urlParams.error}`);
      } else {
        console.log(`The code is: ${urlParams.code}`);

        const [ err, googleData ] = await AuthService.googleLogin(urlParams.code);

        console.table(googleData);
      },
      getToken() {

      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
  }
};
</script>