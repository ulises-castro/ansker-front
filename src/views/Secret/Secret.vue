<template lang="html">
  <container-app :isLoading="isLoading">
    <section class="flex flex-wrap width100 p-b-100">
      <Secret :secret="secret" />
      <section class="flex flex-wrap width100">
        <div class="comment-title">
          Comentarios
        </div>
        <Comment
          v-for="comment in comments"
          :comment="comment"
        />
      </section>
      <aside
        class="flex flex-middle flex-center p-15 is-text-center width100 write-container">
        <span class="flex flex-middle has-text-primary has-text-weight-bold">
          Escribir un comentario
          <b-icon
            class="p-l-10"
            icon="comment">
          </b-icon>
        </span>
      </aside>
    </section>
</container-app>
</template>
<script>
import Secret from '@/components/Secret';
import Comment from '@/components/Comment';
import { get } from '@/api';

export default {
  name: 'SecretView',
  data() {
    return {
      isLoading: true,
      secret: {},
      comments: [
        {
          publishAt: new Date(),
          content: 'Hola este es nu nuevo comentario, no entiendo ciertas cosas pero a veces siento que este comentario no tienen ningún sentido, sabes.',
          avatar: 1,
        },
        {
          publishAt: new Date(),
          content: 'Hola este es nu nuevo comentario, no entiendo ciertas cosas pero a veces siento que este comentario no tienen ningún sentido, sabes.',
          avatar: 2,
        },
        {
          publishAt: new Date(),
          content: 'Hola este es nu nuevo comentario, no entiendo ciertas cosas pero a veces siento que este comentario no tienen ningún sentido, sabes.',
          avatar: 2,
        }
      ],
    }
  },
  components: {
    Secret,
    Comment
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
}

.write-container {
  background: white;
  position: fixed;
  bottom: 63px;
}
</style>
