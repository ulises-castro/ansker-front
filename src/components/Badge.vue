<template lang="html">
  <div class="relative">
    <div class="badge-container">
      <span> {{ this.number }} </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'badge',
  props: {
    number: {
      type: Number,
      default: 0,
      required: true,
    }
  }
}
</script>
<style lang="scss" scoped>

.badge-container {
  background: red;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  border: 2px solid white;
}
</style>
