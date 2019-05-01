<template lang="html">
  <section>
    <slot></slot>
  <!-- <b-dropdown aria-role="list">
    <b-dropdown-item
      class="has-text-dark is-size-5 flex flex-middle pointer"
      target="_blank"
      :href='`https://api.whatsapp.com/send?text=${text}`'
      aria-role="listitem">
      <b-icon
        class="has-text-green"
        icon="whatsapp" pack="fab" />
      Compartir via Whatsapp
    </b-dropdown-item>
    <b-dropdown-item
     class="has-text-dark is-size-5 flex flex-middle pointer"
     target="_blank"
     :href="`https://twitter.com/intent/tweet?text=${text}`"
     aria-role="listitem">
     <b-icon
       class="has-text-green"
       icon="twitter" pack="fab" />
      Compartir via Twitter
    </b-dropdown-item>
    <b-dropdown-item
     class="has-text-dark is-size-5 flex flex-middle pointer"
     :href="`https://www.facebook.com/sharer/sharer.php?u=https://ansker.me/`"
     target="_blank"
     aria-role="listitem">
     <b-icon
       class="has-text-green"
       icon="facebook" pack="fab" />
      Compartir via Facebook
    </b-dropdown-item>
  </b-dropdown> -->
  </section>
</template>
<script>
export default {
  name: 'SocialShare',
  props: {
    url: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    hashtags: {
      type: String,
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log('Mounted');
  }
}
</script>

<style lang="scss" scoped>
</style>
