<template lang="html">
  <container-app :isLoading="isLoading">
    <section :is-full-page="isLoading" ref="section" class="container is-fluid height100">
      <aside
        class=""
        @click="showPublishSecret"
        :class="{'publish-button-float' : true}">
        <icon scale="1.5" name="feather-alt" />
      </aside>

      <div
        v-if="showShareAdvice"
        class="shareus has-text-white-bis flex width100 has-background-primary">
        <div class="width100 p10 p15-0">
          <h3 class="is-size-4 width100 has-text-weight-bold">
            Comparte y difúndenos
          </h3>
          <span class="is-size-5 p15">
            Comparte en tus redes sociales!
          </span>
          <div class="flex" style="width: 80%; max-width: 450px">
            <social-share
              text="Comparte secretos de forma anónima en https://ansker.me">
              <b-button
                slot="trigger"
                type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
                Compartir
              </b-button>
              ]asdasdf
            </social-share>
            <b-button
              @click="closeShareAdvice"
              type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
              Cerrar
            </b-button>
          </div>
        </div>
      </div>

      <aside class="secrets-container width100"
      :style="[{ 'padding-bottom: 0px !important': !secrets.length }]">
        <div class="secret" v-for="secret in secrets">
          <Secret :secret="secret" />
        </div>
      </aside>
    </section>
  </container-app>
</template>
<script>
import Menu from '@/components/Menu';
import Secret from '@/components/Secret';
import { get } from '@/api';

export default {
  name: 'Discover',
  data() {
    return {
      secrets: [],
      isLoading: true,
      showPublishSecretModal: false,
      publishMessage: '',
      showShareAdvice: this.$store.getters.showShareAdvice,
    }
  },
  components: {
    Menu,
    Secret,
  },
  methods: {
    async fetchSecrets() {
      const { data } = await get('secret/allByCity');

      this.isLoading = false;
      this.secrets = data.secrets;
    },
    showPublishSecret() {
      this.$router.push({ name: 'PublishSecret' });
    },
    closeShareAdvice() {
      this.$store.dispatch('hideShareAdvice');
      this.showShareAdvice = false;
    }
  },
  created() {
    this.fetchSecrets();
  },
  mounted() {
    console.log(this.$store.getters['entities/userData/all']());
  },
  metaInfo: {
    // Children can override the title.
    title: 'Secretos en tu ciudad',
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';

.publish-button-float {
  position: fixed;
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

.shareus {
  // height: calc(100vh - 150px);
}

.secrets-container {
  padding-bottom: 150px;
}

.modal {
  padding: 0 20px !important;

  .message {
    color: #404040;
    width: 100%;
    height: 120px;
    padding: 10px;
    border: 1px solid darken($light, 5%);
  }

  .card-content {
  }

  button {
    font-size: 15px;
  }
}
</style>
