<template lang="html">
  <containerApp>
    <section class="container is-fluid p-t-20 height100">
      <header>
        <span class="logo">Ansker:)</span>
      </header>
      <aside class=""
        :class="{'publish-button-float' : true}">
        <icon scale="1.5" name="feather-alt" />
      </aside>
      <aside class="secrets-container width100">
        <div class="secret" style="height: 100px">

        </div>
      </aside>
    </section>
  </containerApp>
</template>
<script>
export default {
  name: 'Discover',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';

.logo {
  font-size: 30px;
  color: $primary;
  font-weight: bold;
  font-family: 'Marck Script', cursive;
}

.publish-button-float {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 80px;
  padding: 15px;
  border-radius: 100%;
  color: $primary;
  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.secrets-container {

}
</style>
