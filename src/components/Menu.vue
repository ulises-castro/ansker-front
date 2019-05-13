<template lang="html">
  <section>
    <div class="menu">
      <div @click="goMenu(1)" class="icon-link">
        <router-link
          :to="{ name: 'Discover', params: {} }
        ">
          <!-- <icon scale="2.2"
            class="m-r-15"
            :class="{'hast-text-grey-lighter' : (activedMenu !== 1) }"
            name="theater-masks"/> -->
            <b-icon
              pack="fas"
              size="is-medium"
              icon="theater-masks"
            />
        </router-link>
      </div>

      <!-- <div @click="goMenu(2)" class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <icon scale="2.2"
            class="m-r-15 has-text-grey-lighter"
            :class="{'hast-text-grey-lighter' : (activedMenu !== 2) }"
            name="users"/>
        </router-link>
      </div> -->

      <div @click="goMenu(3)" class="icon-link">
        <router-link :to="{
            name: 'More', params: {}
          }">
          <!-- <icon scale="1.8"
            class="m-r-15 has-text-grey-lighter"
            :class="{'hast-text-grey-lighter' : (activedMenu !== 3) }"
            name="ellipsis-h"/> -->
            <b-icon
              pack="fas"
              size="is-medium"
              icon="ellipsis-h">
            </b-icon>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activedMenu: this.$store.getters.activedMenu || 1,
    }
  },
  methods: {
    goMenu(value) {
      console.log(value);
      this.activedMenu = value;
      this.$store.dispatch('changeView', value);
    }
  },
  watch: {
    getActivedMenu(value) {
      this.activedMenu = value;
    }
  },
  computed: {
    getActivedMenu() {
      return this.$store.getters.activedMenu;
    }
  }
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
