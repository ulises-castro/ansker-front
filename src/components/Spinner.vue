<template lang="html">
  <a
    class="button is-transparent is-borderless p0-20"
    :class="[{ 'is-loading' : isLoading }, customClass]"
    style="background-color: transparent">
  </a>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    customClass: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
