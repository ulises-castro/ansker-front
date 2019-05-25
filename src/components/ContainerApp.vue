<template lang="html">
  <section class="parent-container">
    <!-- <b-loading
      :is-full-page="isFullPage"
      :active.sync="isLoading">
    </b-loading>
     -->
    <!-- <HeaderApp :showBackButton="showBackButton"></HeaderApp> -->

    <van-nav-bar
      :title="title"
      class="headerBar"
      left-text="Regresar"
      @click-left="handlerActionLeft"
      :left-arrow="showBackButton"
      >
      <div v-if="!showBackButton" slot="left">
        <van-icon
        class="is-size-5"
        info="30"
        name="bullhorn-o"
        />
      </div>
      <div
        slot="right"
      >
        <van-icon
          v-if="showBackButton"
          class="is-size-5"
          name="bullhorn-o"
        />
        <van-icon
          v-else
          @click="goPublish"
          class="is-size-5" name="edit"
        />
      </div>

      <span slot="title"> Ansker:) </span>
      </van-nav-bar>
    <slot></slot>
    <Menu></Menu>
  </section>
</template>

<script>
import Menu from './Menu';
import HeaderApp from './HeaderApp';

export default {
  name: 'container-app',
  data() {
    return {}
  },
  watch: {
    isLoading() {
      if (this.isLoading) {
        this.$toast.loading({
          mask: true,
          message: 'Cargando...'
        });
      }
    }
  },
  mounted() {
  },
  methods: {
    goPublish() {
      
    },
    handlerActionLeft() {
      const { showBackButton } = this;
      if (showBackButton) {
        return this.$router.go(-1);
      }

      // Show notifications
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFullPage: {
      type: Boolean,
      default: false,
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    title: {
      default: '',
    },
  },
  components: {
    Menu,
    HeaderApp,
  }
}
</script>

<style lang="scss">
@import '@/styles/main.scss';
  .parent-container {
    min-height: 100%;
    height: auto;
    width: 100%;
    background: #F7F7F7;
  }

  .headerBar {
    .van-nav-bar__title {
      font-size: 22px;
      color: $primary;
      font-weight: bold;
      font-family: 'Marck Script', cursive;
    }
  }
</style>
