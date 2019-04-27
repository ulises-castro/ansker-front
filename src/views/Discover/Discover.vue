<template lang="html">
  <container-app>
    <section :is-full-page="isLoading" ref="section" class="container is-fluid height100">
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
