<template lang="html">
  <section>
    <div class="menu">
      <van-tabbar
        class="has-text-weight-bolds"
        active-color="#239bce"
        v-model="active">
        <van-tabbar-item icon="home-o" info="10">
          Inicio
        </van-tabbar-item>
        <!-- <van-tabbar-item
          icon="friends-o" info="5">Tab</van-tabbar-item> -->
        <van-tabbar-item
          icon="setting-o">
          Configuración
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      active: 0,
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.menu {
  position: fixed;
  display: flex;
  width: 100%;
  background: white;
  justify-content: space-evenly;
  bottom: 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  .icon-link {
    padding: 10px 10px;
    padding-top: 15px;
  }
}


</style>
