<template>
</template>

<script>
import axios from "axios"
import AuthService from "src/services/AuthService"
import * as queryString from "query-string"
import { mapActions } from 'vuex'

import {
  Loading,
} from 'quasar'

export default {
  name: "google",
  methods: {
    async init() {
      Loading.show()
      const urlParams = queryString.parse(window.location.search)

      console.log(`The code is: ${urlParams.code}`)

      const [ err, googleData ] = await AuthService.googleLogin(urlParams.code)

      console.log(googleData)
      if (err) {
        this.$router.push({ name: 'Home' })
        return this.$notify(`${err.response.data.message}`)
      }

      this.getTokenAndsignIn(googleData.data.access_token)
    },
    async getTokenAndsignIn(access_token) {
      console.log(this.$route.params)
      const [err, token] = await AuthService.signInGoogle(access_token)

      if (err) return this.$notify(`${err.response.data.message}`)

      console.log(token.data)
      this.$notify({ type: 'success', message: 'Welcome to  ansker' })

      this.login(token.data.token)

      this.$router.push({ name: 'Discover' })
    },
    ...mapActions('User',[
      'login',
    ])
  },
  created() {
    this.init()
  },
  mounted() {
  }
}
</script>