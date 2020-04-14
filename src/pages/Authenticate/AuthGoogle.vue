<template>
  <div></div>
</template>

<script>
import axios from "axios"
import { Auth } from "src/services"
import * as queryString from "query-string"
import { mapActions } from 'vuex'

import {
  Loading,
} from 'quasar'

export default {
  name: "google",
  props: ['handlerError'],
  methods: {
    async init() {
      Loading.show()
      const urlParams = queryString.parse(window.location.search)

      console.log(`The code is: ${urlParams.code}`)

      const [ err, googleData ] = await Auth.googleLogin(urlParams.code)

      console.log(googleData)
      if (err) {
        this.$router.push({ name: 'Home' })

        return handlerError(err)
      }

      this.getTokenAndsignIn(googleData.data.access_token)
    },
    async getTokenAndsignIn(access_token) {
      console.log(this.$route.params)
      const [err, token] = await Auth.signInGoogle(access_token)

      if (err) return handlerError(err)

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
  beforeDestroy() {
    Loading.hide()
  }
}
</script>