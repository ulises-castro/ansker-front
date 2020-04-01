<template>
  <div>Loading data</div>
</template>

<script>
import axios from "axios";
import * as queryString from "query-string";

export default {
  name: "google",
  methods: {
    init() {
      const urlParams = queryString.parse(window.location.search);

      if (urlParams.error) {
        console.log(`An error occurred: ${urlParams.error}`);
      } else {
        console.log(`The code is: ${urlParams.code}`);
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>