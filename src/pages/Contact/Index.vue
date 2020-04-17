<template>
  <div class="q-pa-sm">
    <div class="q-py-md">
      <p class="text-center text-grey-9"> Tratemos de responderte lo antes posible </p>
    </div>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="Mensaje"
      type="textarea"
      autofocus
      maxlength="500"
      placeholder="¿Cómo te podemos ayudar?"
      show-word-limit
    >
    </van-field>
    <div class="row justify-end q-py-sm">
      <van-button size="small" type="primary">Enviar</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      message: ''
    }
  }
}
</script>
