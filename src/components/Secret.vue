<template lang="html">
  <div class="secret"
    :style="{'background-color': secret.backgroundColor}">
    <!-- <div class="secret-header">
      {{ secret.date }}
    </div> -->
    <div
      class="secret-body"
      :style="{'background-color': secret.backgroundColor}">
      {{ secret.content }}
    </div>
    <div class="secret-actions">
      <div class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <icon scale="1.6"
            class="m-r-15"
            name="comment"
            :style="{ color: 'white' }"/>
        </router-link>
      </div>
      <div class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <icon scale="1.6"
            class="m-r-15"
            name="share"
            :style="{ color: 'white' }"/>
        </router-link>
      </div>
      <div class="icon-link" style="color: red !important">
        <router-link :to="{ name: '', params: {} }">
          <icon scale="1.6"
          color="has-text-color-red"
            class="m-r-15"
            name="heart"
            :style="{ color: 'white' }"/>
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
    font-size: 25px;
    height: 200px;
    padding: 20px;
    font-weight: bold;
    color: white;
    background: rgb(65, 108, 121);
  }

  &-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    padding-bottom: 6px;

    .icon-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
