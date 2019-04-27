<template lang="html">
  <container-app :isLoading="isLoading">
    <section class="flex flex-wrap width100">
      <Secret :secret="secret" />
      <section class="flex flex-wrap width100">
        <div class="comment-title">
          Comentarios
        </div>
        <article class="comment flex flex-wrap width100">
          <div class="comment-header">

          </div>
          <div class="comment-body flex width100">

            <div class="container-avatar">
              <img src="@/assets/avatars/avatar1.png" alt="">
            </div>
            <div class="p0-15">
              Hola este es nu nuevo comentario, no entiendo ciertas cosas pero a veces siento que este comentario no tienen ningún sentido, sabes.
            </div>
          </div>
          <div class="comment-footer flex flex-end width100 p-r-15 p-b-5">
            Hace 3 minutos
          </div>
        </article>
        <article class="comment flex flex-wrap width100">
          <div class="comment-header">

          </div>
          <div class="comment-body flex width100">

            <div class="container-avatar">
              <img src="@/assets/avatars/avatar2.png" alt="">
            </div>
            <div class="p0-15">
              Hola este es nu nuevo comentario, no entiendo ciertas cosas pero a veces siento que este comentario no tienen ningún sentido, sabes.
            </div>
          </div>
          <div class="comment-footer flex flex-end width100 p-r-15 p-b-5">
            Hace 3 minutos
          </div>
        </article>
      </section>
    </section>
</container-app>
</template>
<script>
import Secret from '@/components/Secret';
import { get } from '@/api';

export default {
  name: 'SecretView',
  data() {
    return {
      isLoading: true,
      secret: {},
    }
  },
  components: {
    Secret,
  },
  mounted() {
    this.fetchSecret();
  },
  methods: {
    async fetchSecret() {
      const { secretId } = this.$route.params;

      const { data } = await get('secret/' + secretId);
      this.isLoading = false;
      console.log(data, "La data aquí");
      return this.secret = data.secret;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';

.comment {

  &-title {
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
    background: white;
    width: 100%;
    border: 1px solid #e8e8e8;
  }

  &-body {
    width: 100%;
    background: white;
    padding: 10px;
    font-size: 16px;
  }

  .container-avatar {

    img {
      background: #ac3232;
      border-radius: 100%;
      width: 150px;
    }
  }


  &-footer {
    background: white;
    font-size: 14px;
  }

}
</style>
