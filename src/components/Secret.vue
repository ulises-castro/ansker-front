<template lang="html">
  <div class="secret">
    <div class="secret-header">
      {{ secret.date }}
    </div>
    <div class="secret-body">
      {{ secret.message }}
    </div>
    <div class="secret-actions">
      <div class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <icon scale="1.6"
            class="m-r-15"
            name="comment"/>
        </router-link>
      </div>
      <div class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <icon scale="1.6"
            class="m-r-15"
            name="share"/>
        </router-link>
      </div>
      <div class="icon-link" style="color: red !important">
        <router-link :to="{ name: '', params: {} }">
          <icon scale="1.6"
          color="has-text-color-red"
            class="m-r-15"
            name="heart"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Secret',
  props: {
    secret: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.secret {
  background: white;
  border: 1px solid #e4e4e4;

  &-header {
    padding: 10px;
    padding-bottom: 0;
  }

  &-body {
    padding: 10px;
  }

  &-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    padding-bottom: 6px;
    border-top: 1px solid #e4e4e4;

    .icon-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
