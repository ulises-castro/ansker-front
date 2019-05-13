<template lang="html">
  <header class="header p-t-5">
    <div
      v-show="showBackButton"
      @click="$router.push({ name: 'Discover' })"
      class="arrow-container">
      <b-icon
        icon="arrow-left"
        type="is-primary"
        pack="fas">
      </b-icon>
      
    </div>
    <span
      @click="$router.push({ name: 'Discover' })"
      class="logo">
      Ansker:)
    </span>
    <div class="notifications-container">
      <b-dropdown
        position="is-bottom-left"
        aria-role="menu">
      <!-- <badge :number="0"></badge> -->
      <div slot="trigger" class="notifications">
      <b-icon
        type="is-primary"
        icon="bell" pack="far" />
      </div>
      <b-dropdown-item has-link aria-role="menuitem">
        <span class="is-size-5">
          Notificaciones
        </span>
      </b-dropdown-item>
      <hr class="dropdown-divider">
      <b-dropdown-item has-link aria-role="menuitem">
        ¡Seguimos trabajando en el sistema de notificaciones!
      </b-dropdown-item>
    </b-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderApp',
  props: {
    showBackButton: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.header {
  // border-bottom: 2px solid #e4e4e4;
  background: white;
  border-bottom: 1px solid #e4e4e4;
}

.logo {
  font-size: 30px;
  color: $primary;
  font-weight: bold;
  font-family: 'Marck Script', cursive;
}

.notifications-container {
  position: absolute;
  right: 10px;
  top: 13px;
}

.arrow-container {
  position: absolute;
  top: 13px;
  left: 10px;
}

</style>
