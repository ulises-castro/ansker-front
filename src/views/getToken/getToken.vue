<template>
  <section>
    <h3 class="logo">Ansker:)

    </h3>
  </section>
</template>
<script>
export default {
  name: 'getToken',
  data() {
    return {};
  },
  created() {
    if (true) {
      this.$toast.loading({
        mask: true,
        message: 'Cargando...',
      });
    }

    const { token } = this.$route.params;

    // Consider implement models with orm
    // this.$store.dispatch('entities/userData/create', { data });

    const user = {};
    this.$store.dispatch('login', { token, user });
    this.$router.push({ name: 'Discover' });
  },
};
</script>
<style lang="scss" scoped>

</style>
