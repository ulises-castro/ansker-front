<template lang="html">
  <container-app>
    <section>
      <Secret :secret="secret" />
    </section>
</container-app>
</template>
<script>
import Secret from '@/components/Secret';
import { get } from '@/api';

export default {
  name: 'SecretView',
  data() {
    return {
      isLoading: true,
      secret: {},
    }
  },
  components: {
    Secret,
  },
  created() {
    this.fetchSecret();
  },
  methods: {
    async fetchSecret() {
      const { secretId } = this.$route.params;

      const { data } = await get('secret/' + secretId);
      this.isLoading = false;
      console.log(data, "La data aquí");
      return this.secret = data.secret;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
