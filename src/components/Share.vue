<template>
    <van-share-sheet
    v-model="showDesktop"
    title="Compartir"
    @select="handlerShare"
    description="Comparte con tus amigos"
    :options="shareOptions" />
</template>
<script>
import copy from 'copy-to-clipboard'

export default {
  name: 'Share',
  props: ['showShare'],
  data() {
    return {
      showDesktop: false,
      shareOptions: [
        { name: 'Whatsapp', icon: '/statics/icons/social/whatsapp.svg' },
        { name: 'Facebook', icon: '/statics/icons/social/facebook.svg' },
        { name: 'Twitter', icon: '/statics/icons/social/twitter.png' },
        { name: 'Link', icon: 'link' },
      ],
    }
  },
  created() {
    this.choiceShare()
  },
  methods: {
    choiceShare() {
      if (navigator.share && this.$q.platform.is.mobile) {
        navigator.share({
          title: 'WebShare API Demo',
          url: 'https://ansker.me'
        }).then(() => {
          this.$notify({  type: 'success', message: 'Thanks for sharing!'});
        })
        .catch(console.error);
      } else {
        this.showDesktop = true
      }
    },
    handlerShare(option) {
      let name = option.name.toLowerCase()

      this[name]()
    },
    whatsapp() {
      window.href="whatsapp://send?text=The text to share!"
    },
    facebook() {
      window.open( `https://www.facebook.com/sharer/sharer.php?u=https://ansker.me`)
    },
    instagram() {
    },
    twitter() {
      window.open('https://twitter.com/share?url=https://ansker.me&text="Comparte con personas de tu alrededor de forma anónima" -')

    //  =URLENCODED_URL&via=TWITTER_HANDLE&text=TEXT"
    },
    link() {
      this.$notify({ type: 'success', message: 'Se ha copiado con existo el link'})
      copy('https://ansker.me')
    }
  }
}
</script>