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

      const extractCode = window.location.href.split('?')
      const urlParams = queryString.parse(extractCode[1])

      const [ err, googleData ] = await Auth.googleLogin(urlParams.code)

      if (err) {
        this.$router.push({ name: 'Home' })

        return this.handlerError(err)
      }

      this.getTokenAndsignIn(googleData.data.access_token)
    },
    async getTokenAndsignIn(access_token) {
      const [err, token] = await Auth.signInGoogle(access_token)

      if (err) return this.handlerError(err)

      this.$notify({ type: 'success', message: 'Welcome to  Ansker' })

      this.login(token.data.token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token.data.token}`

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