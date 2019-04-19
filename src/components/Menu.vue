<template lang="html">
  <section>
    <div class="menu">
      <div class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          h
        </router-link>
      </div>
      <div class="icon-link">
        <router-link :to="{ name: '', params: {} }"></router-link>
      </div>
      <div class="icon-link">
        <router-link :to="{ name: '', params: {} }"></router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.menu {
  display: flex;
  width: 100%;
  background: white;
  position: absolute;
  bottom: 0;

  .icon-link {

    padding: 10px;
  }
}

</style>
