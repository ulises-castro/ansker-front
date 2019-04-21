<template lang="html">
  <containerApp>
    <Modal :show="showPublishSecretModal">
      <div class="card">
          <div class="card-content p-t-10 p-b-15">
            <div class="p-b-10">
              <small>Guadalajara, Jal.</small>
            </div>
            <div class="width100">
              <textarea
                class="message"
                v-model="publishMessage"
                placeholder="Escribe aquí"
                name="name"></textarea>
            </div>
            <div class="width100">
              <div class="width100 flex space-between">
                <small
                  class="has-text-weight-bold"
                  :class="{'has-text-danger' : publishMessage.length > '200'}">
                  {{ publishMessage.length }}/200
                </small>
                <b-button type="is-primary">Publicar</b-button>
              </div>
              <div class="p-t-10">
                <small class="">La publicación será totalmente anónima.</small>

              </div>
            </div>
          </div>
      </div>
    </Modal>
    <section class="container is-fluid height100">
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
import Modal from '@/components/Modal';


export default {
  name: 'Discover',
  data() {
    return {
      secrets: [
        {
          date: 'Hace 3 minutos',
          message: 'Estoy embaraza y no puedo mantenerlo, ¿alguien ha pasado por lo mismo?, no sé que hacer!',
        },
        {
          date: 'Hace 5 minutos',
          message: 'No quedé en la universidad no tengo idea de como lo tomarán mis papás estoy decepcionado de mí mismo',
        },
        {
          date: 'Hace 8 minutos',
          message: 'No tengo idea de como contarle a mi maestra que me atrae',
        },
        {
          date: 'Hace 8 minutos',
          message: 'No tengo idea de como contarle a mi maestra que me atrae',
        },
      ],
      showPublishSecretModal: true,
      publishMessage: '',
    }
  },
  components: {
    Menu,
    Secret,
    Modal,
  },
  methods: {
    showPublishSecret() {
      console.log("Aqui");
      this.showPublishSecretModal = true;
    }
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
    width: 100%;
    height: 120px;
    padding: 10px;
    border: 1px solid darken($light, 5%);
  }

  .card-content {
  }
}
</style>
