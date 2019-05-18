<template lang="html">
  <div class="secret"
    style="background-image: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg')"
    :style="{'background-color': secret.backgroundColor}">
    <div
      class="secret-body"
        style="background-image: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg')"
      :style="{'background-color': secret.backgroundColor}">
      <span>
        {{ secret.content }}
      </span>
    </div>
    <div class="secret-actions">
      <div
        @click="goSecret(secret.id)"
        class="icon-link has-background-white">
        <router-link :to="{ name: '', params: {} }">
          <van-icon name="clock-o"/>
        </router-link>
        <span class="indicator p-l-5 has-text-weight-bold">
          1 hr
        </span>
      </div>
      <div
        @click="showOptions = true"
        class="icon-link">
        <van-icon name="ellipsis" class="is-size-4" />
      </div>
      <div
        @click="goSecret(secret.id)"
        class="icon-link">
        <span class="indicator p-r-5"> {{ secret.comments }} </span>
        <router-link :to="{ name: '', params: {} }">
          <van-icon name="chat-o"></van-icon>
        </router-link>
      </div>
      <div
        @click="like"
        class="icon-link">
        <span class="p-r-5 indicator">
          {{ secret.likes }}
        </span>
        <router-link :to="{ name: '', params: {} }">
          <van-icon name="like-o" />
        </router-link>
      </div>
    </div>
    <van-actionsheet
      v-model="showOptions"
      title="Selecciona una opción"
      :actions="actions"
    />
    <!-- <van-popup v-model="showOptions" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="Opciones"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup> -->
  </div>
</template>

<script>
import { get, post } from '@/api';

export default {
  name: 'Secret',
  props: {
    secret: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      showOptions: false,
      isUserLogged: this.$store.getters.isLogged,
      userLogged: this.$store.getters.isLogged,
      actions: [
        {
          name: 'Option'
        },
        {
          name: 'Option',
          description: 'Description'
        },
        {
          loading: true
        },
        {
          name: 'Disabled Option',
          disabled: true
        }
      ]
    }
  },
  mounted() {
    this.showJoinUs();
  },
  methods: {
    showJoinUs() {
      console.log('Hola perro');
      if (!this.isUserLogged ) {
        this.$emit('openShowJoinUs');
        return true;
      }

      return false;
    },
    async like() {
      if (this.showJoinUs) return;
      const { secretId } = this.secret;

      const { data } = await post('secret/liked', { secretId });

      this.secret.userLiked = !this.secret.userLiked;
      const operation = (!this.secret.userLiked) ? -1 : 1
      this.secret.likes += operation;
    },
    goSecret() {
      const { secretId } = this.secret;

      this.$router.push({
        name: 'Secret',
        params: { secretId }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

$shadow-icons: 0px 0px 3px rgba(150, 150, 150, 1);

.secret {
  background: white;
  width: 100%;
  border: 1px solid #e4e4e4;

  &-header {
    padding: 10px;
    padding-bottom: 0;
  }

  .indicator {
    color: white;
    font-weight: bold;
    text-shadow: $shadow-icons;

  }

  .liked {
    color: #ff0088;
  }

  &-body {
    display: table;
    font-size: 25px;
    text-align: center;
    width: 100%;
    height: 200px;
    padding: 20px;
    font-weight: bold;
    color: white;
    background: rgb(65, 108, 121);

    span {
      display: table-cell;
      vertical-align: middle;
    }
  }

  &-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    padding-bottom: 6px;

    .icon-link {
      display: flex;
      align-items: center;
      cursor: pointer;

      i {
        color: white;
        font-weight: bold;
        font-size: 1.3em;
        text-shadow: $shadow-icons;

      }

      a {
        color: #fff;
      }
    }
  }
}
</style>
