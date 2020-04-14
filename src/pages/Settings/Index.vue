<template>
  <section>
    <van-field name="switch" label="Switch">
      <template #input>
      </template>
    </van-field>
    <div class="q-pa-md">
      <van-button @click="goLogout" size="large" type="danger" round><b>Cerrar sesión</b></van-button>
    </div>
  </section>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Settings',
  data() {
    return {
      switchChecked: false,
    }
  },
  methods: {
    ...mapActions('User', ['logout']),
    goLogout() {
      this.logout()

      this.$router.push({ name: 'Home'})
    },
  }
}
</script>