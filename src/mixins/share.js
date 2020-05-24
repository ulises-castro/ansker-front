const ShareMixin = {
  data: function () {
    return {
      propShowShare: false,
      shareText: 'Comparte con personas de tu alrededor de forma anónima',
    }
  },
  methods: {
    share() {
      this.choiceShare()
    },
    choiceShare() {
      if (navigator.share) {
        navigator.share({
          title: this.shareText,
          text: 'Comparte con tu alrededor anónimamente',
          url: 'https://ansker.me'
        })
        .then(() => {
          this.$notify({  type: 'success', message: 'Thanks for sharing!'})
        })
        .catch()
      } else {
        this.propShowShare = new Date()
      }
    },
  }
}

export default ShareMixin