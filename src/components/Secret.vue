<template lang="html">
  <div class="secret"
    :style="{'background-color': secret.backgroundColor}">
    <!-- <div class="secret-header">
      {{ secret.date }}
    </div> -->
    <div
      class="secret-body"
      :style="{'background-color': secret.backgroundColor}">
      {{ secret.content }}
    </div>
    <div class="secret-actions">
      <div
        @click="goSecret(secret.id)"
        class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <!-- <icon scale="1.6"
            class="m-r-10"
            name="comment"
            :style="{ color: 'white' }"/> -->
          <b-icon
            icon="comment"
            class="m-r-10"
            :type="{ color : 'white' }"
          />
          </b-icon>
        </router-link>
        <span class="indicator"> {{ secret.comments }} </span>
      </div>
      <div class="icon-link">
        <social-share
          quote='Comparte secretos con tu alrededor de forma anónima'
          :text='`"${secret.content}" - secreto publicado en `'
          :url="`https://ansker.me`">
          <router-link
            :to="{ name: '', params: {} }">
            <!-- <icon scale="1.6"
               class="m-r-10"
               name="share"
               :style="{ color: 'white' }"
             /> -->
            <b-icon
              icon="share"
              class="m-r-10"
              :class="{ color : 'white' }"
              name="heart"
            />
           </router-link>
        </social-share>
        <!-- <span class="indicator"> {{ secret.shares }} </span> -->
      </div>
      <div
        @click="like"
        class="icon-link" style="color: red !important">
        <router-link :to="{ name: '', params: {} }">
          <!-- <icon scale="1.6"
            color="has-text-color-red"
            class="m-r-10"
            :class="[{'liked' : secret.userLiked}]"
            name="heart"
          /> -->
          <b-icon
            icon="heart"
            class="m-r-10"
            :class="[{'liked' : secret.userLiked}]"
            name="heart"
          />
        </router-link>
        <span class="indicator"> {{ secret.likes }} </span>
      </div>
    </div>
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

    }
  },
  methods: {
    async like() {
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
  }

  .liked {
    color: #ff0088;
  }

  &-body {
    font-size: 25px;
    height: 200px;
    padding: 20px;
    font-weight: bold;
    color: white;
    background: rgb(65, 108, 121);
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

      a {
        color: #fff;
      }
    }
  }
}
</style>
