<template>
</template>
<script>
export default {
  name: 'getToken',
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params, 'params');
  },
  created() {
    let user = { ...data };
    const { token } = data;

    // Consider implement models with orm
    // this.$store.dispatch('entities/userData/create', { data });

    this.$store.dispatch('login', { token, user });
    this.login.isLoading = false;

    this.$router.push({ name: 'Discover' });
  }
}
</script>
<style lang="scss" scoped>

</style>
