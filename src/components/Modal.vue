<template lang="html">
  <b-modal :active.sync="show" scroll="keep">
    <slot></slot>
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.modal {
  padding: 0 20px !important;

  .message {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid darken($light, 5%);
  }

  .card-content {
  }
}
</style>
