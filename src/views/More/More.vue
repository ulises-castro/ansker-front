<template>
  <container-app>
    <section class="has-background-primary width100 height100 flex flex-center flex-wrap">
      <div
        class="shareus has-text-white-bis flex width100 ">
        <div class="width100 p10 p15-0">
          <h3 class="is-size-4 width100 has-text-weight-bold">
            ¡Versión Beta!
          </h3>
          <span class="is-size-5 p-t-15" style="width: 80%">
            ¡Seguimos trabajando en mejoras!
          </span>

          <div class="flex flex-center width100">
            <div class="flex width100 space-around p-t-50" style="max-width: 450px">
              <b-button
                @click="closeSession()"
                type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
                Cerrar sesión
              </b-button>
              <!-- <social-share
                quote='Comparte lo que piensas con tu alrededor de manera anónima'
                text="Comparte lo que piensas con tu alrededor de manera anónima en https://ansker.me"> -->
                <!-- <b-button
                  type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
                  Me gusta la app
                </b-button>
              </social-share>
              <b-button
                @click="closeShareAdvice"
                type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
                No me gustó Ansk
              </b-button> -->
            </div>
          </div>
        </div>
      </div>

      <div>

      </div>
    </section>
  </container-app>
</template>
<script>
export default {
  name: 'More',
  data() {
    return {};
  },
  methods: {
    closeSession() {
      this.$store.dispatch('logout');

      this.$router.push({ name: 'Home' });
    }
  }
}
</script>
<style lang="scss" scoped>
.shareus {
  height: 200px;
}
</style>

