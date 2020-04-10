<template>
  <div>Loading data</div>
</template>

<script>
import axios from "axios"
import AuthService from "src/services/AuthService"
import * as queryString from "query-string"

export default {
  name: "google",
  methods: {
    async init() {
      const urlParams = queryString.parse(window.location.search)

      console.log(`The code is: ${urlParams.code}`)

      const [ err, googleData ] = await AuthService.googleLogin(urlParams.code)

      console.log(googleData)
      if (err) return this.$notify(`${err.response.data.message}`)

      this.getTokenAndsignIn(googleData.data.access_token)
    },
    getTokenAndsignIn(access_token) {
      console.log(this.$route.params)
      const [err, token] = AuthService.getTokenAndSignIn(access_token)

      if (err) return this.$notify(`${err.response.data.message}`)

      console.log(token.data)
      this.$notify({ type: 'success', message: 'Welcome to ansker' });
    }
  },
  created() {
    this.init()
  },
  mounted() {
  }
}
</script>