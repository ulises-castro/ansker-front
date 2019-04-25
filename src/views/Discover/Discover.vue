<template lang="html">
  <containerApp>
    <!-- <b-modal :active.sync="showPublishSecretModal" scroll="keep">
      <div class="card">
          <div class="card-content p-t-10 p-b-15">
            <div class="p-b-10">
              <small>Guadalajara, Jal.</small>
            </div>
            <div class="width100">
              <textarea
                ref="publishMessage"
                class="message"
                v-model="publishMessage"
                placeholder="Escribe aquí"
                name="name"></textarea>
            </div>
            <div class="width100">
              <div class="width100 flex space-between flex-middle">
                <small
                  class="has-text-weight-bold"
                  :class="{'has-text-danger' : publishMessage.length > '200'}">
                  {{ publishMessage.length }}/200
                </small>
                <b-button
                  type="is-primary" icon-right="paper-plane" >
                  Publicar
                </b-button>
              </div>
              <div class="p-t-10">
                <small class="">La publicación será totalmente anónima.</small>

              </div>
            </div>
          </div>
      </div>
    </b-modal> -->
    <section  ref="section" class="container is-fluid height100">
      <header class="header p-t-5">
        <span class="logo">Ansker:)</span>
      </header>
      <aside
        class=""
        @click="showPublishSecret"
        :class="{'publish-button-float' : true}">
        <icon scale="1.5" name="feather-alt" />
      </aside>
      <aside class="secrets-container width100">
        <div class="secret" v-for="secret in secrets">
          <Secret :secret="secret" />
        </div>
      </aside>
    </section>
  </containerApp>
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
      showPublishSecretModal: false,
      publishMessage: '',
    }
  },
  components: {
    Menu,
    Secret,
  },
  methods: {
    async fetchSecrets() {
      const { data } = await get('secret/allByCity');

      this.secrets = data.secrets;
    },
    showPublishSecret() {
      // console.log("Aqui");
      // this.$refs.publishMessage.click();
      // this.showPublishSecretModal = true;
      this.$router.push({ name: 'PublishSecret' });
    }
  },
  created() {
    this.fetchSecrets();
  },
  mounted() {
    console.log(this.$store.getters['entities/userData/all']());
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

.secrets-container {
  padding-bottom: 150px;
}

.header {
  // border-bottom: 2px solid #e4e4e4;
  background: white;
  border-bottom: 1px solid #e4e4e4;
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
