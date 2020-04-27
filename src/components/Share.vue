<template>
    <van-share-sheet
    v-model="showShare"
    title="Compartir"
    @select="handlerShare"
    description="Comparte con tus amigos"
    :options="shareOptions" />
</template>
<script>
import copy from 'copy-to-clipboard'

export default {
  name: 'Share',
  props: ['showShare', 'shareText'],
  data() {
    return {
      shareOptions: [
        { name: 'Whatsapp', icon: '/statics/icons/social/whatsapp.svg' },
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
      window.open(`whatsapp://send?text="${this.shareText}" - https://ansker.me`)
    },
    facebook() {
      // window.open(`https://www.facebook.com/sharer/sharer.php?u=https://ansker.me`)

    },
    instagram() {
    },
    twitter() {
      window.open(`https://twitter.com/share?url=https://ansker.me&text="${this.shareText}" -`)
    //  =URLENCODED_URL&via=TWITTER_HANDLE&text=TEXT"
    },
    link() {
      this.$notify({ type: 'success', message: 'Se ha copiado con existo el link'})
      copy('https://ansker.me')
    }
  }
}
</script>