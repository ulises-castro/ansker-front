<template>
  <div>Loading data</div>
</template>

<script>
import axios from "axios"
import AuthService from "src/services/auth.service"
import * as queryString from "query-string"

export default {
  name: "google",
  methods: {
    async init() {
      const urlParams = queryString.parse(window.location.search)

      console.log(`The code is: ${urlParams.code}`)

      const [ err, googleData ] = await AuthService.googleLogin(urlParams.code)

      this.$notify(`${err.response.data.message}`)
    },
    getTokenAndsignIn() {
      const { auth_token } = this.$route.params.auth_token
      console.log(this.$route.params)
      const [err, token] = AuthService.getApiToken(auth_token)

      if (err)
    }
  },
  created() {
    if (this.$route.params.code) {
      this.init()
    }

    this.getTokenAndsignIn()
  },
  mounted() {
  }
}
</script>