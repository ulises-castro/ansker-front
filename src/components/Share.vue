<template>
    <van-share-sheet
    v-model="showShare"
    title="Compartir"
    @select="handlerShare"
    description="Comparte con tus amigos"
    :options="shareOptions" />
</template>
<script>
export default {
  name: 'Share',
  props: ['showShare'],
  data() {
    return {
      shareOptions: [
        { name: 'Whatsapp', icon: '/statics/icons/social/whatsapp.svg' },
        { name: 'Instagram', icon: '/statics/icons/social/instagram.svg' },
        { name: 'Facebook', icon: '/statics/icons/social/facebook.svg' },
        { name: 'Twitter', icon: '/statics/icons/social/twitter.png' },
        { name: 'Link', icon: 'link' },
      ],
    }
  },
  methods: {
    handlerShare(option) {
      let name = option.name.toLowerCase()

      this[name]()
    },
    whatsapp() {
    },
    facebook() {
    },
    instagram() {
    },
    twitter() {
    },
    link() {

    }
  }
}
</script>