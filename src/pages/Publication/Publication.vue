<template>
  <section>
    <publication :publication="publication"></publication>
  </section>
</template>
<script>
import Publication from 'src/services/PublicationService'
import publication from 'src/components'
import { mapActions } from 'vuex'

export default {
  name: 'Publication',
  components: { publication },
  data() {
    return {
      publication: [],
    }
  },
  methods: {
    async fetchPublication() {
      const [err, publication] = await Publication.getOne(this.$router.params.id)
    }
  },
  created() {
    this.fetchPublication()
  }
}
</script>