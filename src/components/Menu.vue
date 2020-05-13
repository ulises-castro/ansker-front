<template lang="html">
  <section>
    <div class="menu">
      <van-tabbar
        class="has-text-weight-bolds"
        active-color="#239bce"
        v-model="active">
        <van-tabbar-item :to="{ name: 'Home' }" badge="10">
          <template #icon>
            <van-icon name="home-o" size="32"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="showArentAvailable = true" :to="{ name: 'Home' }" badge="5">
          <template #icon>
            <van-icon name="location-o" size="32"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="showArentAvailable = true" :to="{ name: 'Home' }" badge="5">
          <template #icon>
            <van-icon name="friends-o" size="32"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="showSettings = true">
          <template #icon>
            <van-icon name="setting-o" size="32"/>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <van-action-sheet
      v-model="showSettings"
      @select="selectedMenu"
      :actions="settingsMenu"
      cancel-text="Cancel"
      @cancel="choiseShare = false"
    />

    <Share :showShare="showShare" :shareText="shareText" ></Share>

    <van-dialog v-model="showArentAvailable" title="Pronto tendremos mas mejoras">
        <template #default>
          <div class="q-pa-md">
            <p class="text-center">
              Siguienos en nuestras redes sociales
            </p>
            <div class="row full-width justify-center items-center">
              <q-icon name="img:/statics/icons/social/whatsapp.svg" color="#333333" class="q-mr-sm" size="30px" />
              <q-icon name="img:statics/icons/social/facebook.svg" color="#333" class="q-mr-sm" size="25px" />
              <q-icon name="img:statics/icons/social/twitter.png" color="#333" class="q-mr-sm" size="25px" />
            </div>
          </div>
        </template>
    </van-dialog>

  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Share from 'components/Share'

export default {
  name: "Menu",
  components: { Share },
  data() {
    return {
      active: 0,
      showArentAvailable: false,
      shareText: 'Comparte con personas de tu alrededor de forma anónima',
      showSettings: false,
      showShare: false,
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
    selectedMenu(menu) {
      this[menu.action]()
      this.showSettings = false
    },
    goLogout() {
      this.logout()

      this.$router.push({ name: 'Home'})
    },
    share() {
      this.choiceShare()
    },
    goContact() {
      this.$router.push({ name: 'Contact' })
    },
    choiceShare() {
      if (navigator.share) {
        navigator.share({
          title: this.shareText,
          url: 'https://ansker.me'
        })
        .then(() => {
          this.$notify({  type: 'success', message: 'Thanks for sharing!'});
        })
        .catch(console.error);
      } else {
        this.showShare = true
      }
    },
    ...mapActions('User', ['logout']),
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
  z-index: 100;

  .icon-link {
    padding: 10px 10px;
    padding-top: 15px;
  }
}
</style>
