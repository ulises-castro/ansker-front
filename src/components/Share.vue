<template>
  <section>
    <van-share-sheet
      v-model="showShare"
      title="Compartir"
      @select="handlerShare"
      description="Comparte con tus amigos"
      :options="shareOptions" />

    <!-- <div class="fb-share-button"
      ref="fbShareButton"
      data-href="https://ansker.me"
      data-layout="button">
    </div> -->
  </section>
</template>
<script>
import copy from 'copy-to-clipboard'

export default {
  name: 'Share',
  props: ['propShowShare','shareText'],
  data() {
    return {
      showShare: false,
      shareOptions: [
        { name: 'Whatsapp', icon: '/statics/icons/social/whatsapp.svg' },
        { name: 'Facebook', icon: '/statics/icons/social/facebook.svg' },
        { name: 'Twitter', icon: '/statics/icons/social/twitter.png' },
        { name: 'Link', icon: 'link' },
      ],
    }
  },
  watch: {
    propShowShare() {
      this.showShare = true
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
      window.open(`https://www.facebook.com/sharer/sharer.php?u=https://ansker.me`)
    },
    instagram() {
    },
    twitter() {
      window.open(`https://twitter.com/share?url=https://ansker.me&text="${this.shareText}&hashtags=anonymous,socialmedia,stayhome"`)
    },
    link() {
      this.$notify({ type: 'success', message: 'Se ha copiado con éxito el link'})
      copy('https://ansker.me')
    }
  }
}
</script>