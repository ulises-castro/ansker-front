<template>
  <div class="q-pa-sm">
    <div class="q-py-md">
      <p class="text-center text-grey-9"> Trataremos de responderte lo antes posible </p>
    </div>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label=""
      type="textarea"
      autofocus
      maxlength="500"
      placeholder="¿Cómo te podemos ayudar?"
      show-word-limit
    >
    </van-field>
    <div class="row justify-end q-py-sm">
      <van-button  @click="sendMessage" size="large" type="primary">Enviar</van-button>
    </div>
  </div>
</template>

<script>
import User from 'src/services/UserService'

export default {
  name: 'Contact',
  props: ['handlerError'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async sendMessage() {
      const { message } = this
      const [err, response] = await User.sendContactMessage({ message })

      if (err) this.handlerError(err)

      this.$notify({ type: 'success', message: 'Tu mensaje se ha enviado con éxito' })
    }
  }
}
</script>
