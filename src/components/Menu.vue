<template lang="html">
  <section>
    <div class="menu">
      <van-tabbar
        class="has-text-weight-bolds"
        active-color="#239bce"
        style="border-radius: 20px 20px 0 0; height: 50px; padding-top: 5px"
        v-model="active">
        <van-tabbar-item :to="{ name: 'Home' }">
          <template #icon>
            <van-icon name="home-o" size="32"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="showArentAvailable = true, active = 0" :to="{ name: 'Home' }" class="opacity-3">
          <template #icon>
            <van-icon name="location-o" size="32"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="active = 1" :to="{ name: 'Notifications' }" class="opacity-3">
            <q-icon name="las la-bell" size="35px" />
        </van-tabbar-item>
        <van-tabbar-item @click="showArentAvailable = true, active = 0" :to="{ name: 'Home' }" class="opacity-3">
          <template #icon>
            <van-icon name="friends-o" size="32"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item @click="showSettings = true">
          <template #icon>
            <van-icon name="apps-o" size="32"/>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <van-action-sheet
      v-model="showSettings"
      @select="selectedMenu"
      :actions="settingsMenu"
      cancel-text="Cancel"
      @cancel="choiseShare = false, active = 0"
    />

    <Share :propShowShare="propShowShare" :shareText="shareText"></Share>

    <van-dialog v-model="showArentAvailable" title="Pronto tendremos mas mejoras">
      <div class="q-pa-md">
        <p class="text-center">
          Siguienos en nuestras redes sociales
        </p>
        <div class="row full-width justify-center items-center">
          <a target="blank" href="https://facebook.com/ansker.me">
            <q-icon name="img:statics/icons/social/facebook.svg" color="#333" size="40px" />
          </a>
          <a target="blank" href="https://instagram.com/anskerme_official/">
            <q-icon name="img:/statics/icons/social/instagram.svg" color="#333333" class="q-ml-lg" size="40px" />
          </a>
          <a target="blank" href="https://twitter.com/ansker_me">
            <q-icon name="img:statics/icons/social/twitter.png" color="#333" class="q-ml-lg" size="40px" />
          </a>
        </div>
        <div class="row justify-center text-center q-pt-lg">
          <span>
            Unete al grupo oficial y comparte tus dudas y/o sugerencias
          </span>
          <div class="q-pt-md">
            <a target="blank" href="https://t.me/anskerme">
              <q-icon name="img:statics/icons/social/telegram.png" color="#333" size="50px" />
            </a>
            <p class="text-center text-blue-8 q-ma-none">
              Telegram
            </p>
          </div>
        </div>
      </div>
    </van-dialog>

    <JoinUs :openJoinUs="openJoinUs"></JoinUs>

  </section>
</template>

<script>
import { mapActions } from 'vuex'
import ShareMixin from 'src/mixins/share'
import Share from 'components/Share'
import JoinUs from 'src/components/JoinUs'
import { isLogged } from '../store/user/getters'

import { mapGetters } from 'vuex'

const userOptions = [
    {
    name: 'Configuración',
    action: 'setting',
    disabled: true
    },
    {
      name: 'Cerrar sesión',
      action: 'goLogout',
      color: '#D32F30'
    },
  ]

export default {
  name: 'Menu',
  components: { Share, JoinUs },
  mixins: [ShareMixin],
  data() {
    return {
      active: 0,
      showArentAvailable: false,
      openJoinUs: false,
      showSettings: false,
      settingsMenu: [
        { name: 'Ayuda', action: 'goContact',  },
        { name: 'Contactanos', action: 'goContact' },
        { name: 'Compartir con tus amigos', action: 'share' }
      ]
    };
  },
  computed: {
    ...mapGetters('User', ['isLogged'])
  },
  mounted() {
    if (this.isLogged) userOptions.forEach(option => this.settingsMenu.push(option)) 
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

    goContact() {
      this.$router.push({ name: 'Contact' })
    },
    ...mapActions('User', ['logout']),
  }
};
</script>

<style lang="scss" scoped>
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
