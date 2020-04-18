<template lang="html">
  <section>
    <div class="menu">
      <van-tabbar
        class="has-text-weight-bolds"
        active-color="#239bce"
        v-model="active">
        <van-tabbar-item :to="{ name: 'Home' }" badge="10">
          <template #icon>
            <van-icon name="home-o" size="28"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item :to="{ name: 'Home' }" badge="5">
          <template #icon>
            <van-icon name="location-o" size="28"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item :to="{ name: 'Home' }" badge="5">
          <template #icon>
            <van-icon name="friends-o" size="28"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="showSettings = true">
          <template #icon>
            <van-icon name="setting-o" size="28"/>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <van-action-sheet
      v-model="showSettings"
      @select="selectedMenu"
      :actions="settingsMenu"
      cancel-text="Cancel"
      @cancel="showSettings = false"
    />

    <van-share-sheet
    v-model="showShare"
    title="Compartir"
    description="Comparte con tus amigos"
    :options="shareOptions" />
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Menu",
  data() {
    return {
      active: 0,
      showSettings: false,
      showShare: !false,
      shareOptions: [
        { name: 'Whatsapp', icon: '/statics/icons/social/whatsapp.svg' },
        { name: 'Instagram', icon: '/statics/icons/social/instagram.svg' },
        { name: 'Facebook', icon: '/statics/icons/social/facebook.svg' },
        { name: 'Twitter', icon: '/statics/icons/social/twitter.png' },
        { name: 'Link', icon: 'link' },
        { name: 'Qrcode', icon: 'qrcode' },
      ],
      settingsMenu: [
        { name: 'Ayuda', action: "help" },
        { name: 'Contactanos', action: "goContact" },
        { name: 'Configuración', action: "setting"},
        { name: 'Compartir con tus amigos', action: "share" },
        { name: 'Cerrar sesión', action: "goLogout", color: '#D32F30' },
      ]
    };
  },
  methods: {
    ...mapActions('User', ['logout']),
    selectedMenu(menu) {
      this[menu.action]()
    },
    goLogout() {
      this.logout()

      this.$router.push({ name: 'Home'})
    },
    share() {
      this.showShare = true
    },
    goContact() {
      this.$router.push({ name: 'Contact' })
    },
  }
};
</script>

<style lang="scss" scoped>
// @import "@/styles/main.scss";

.menu {
  position: fixed;
  display: flex;
  width: 100%;
  background: white;
  justify-content: space-evenly;
  bottom: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .icon-link {
    padding: 10px 10px;
    padding-top: 15px;
  }
}
</style>
