<template lang="html">
  <!-- <div class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen publication"> -->
    <div class="publication">
      <van-image
        lazy-load
        class="background-image"
        :width="screenWidth"
        :src="publication.image"
        :height="300">
      ></van-image>
      <img >
    <div style="position: absolute; top: 0; right: 0; z-index: 100">
      <div class="row justify-end q-pa-sm icon-link"
        @click="handlerShowOptions">
        <q-icon name="las la-ellipsis-h" color="white" class="q-mr-sm" size="30px" />
      </div>
    </div>
    <div
      @click="goPublication(publication.id)"
      class="publication-body">
      <span style="text-shadow: 0px 0px 14px #9e9e9e;">
        {{ publication.content }}
      </span>
    </div>
    <div @click="showJoinUs" class="publication-actions">
      <div
        @click="goPublication(publication.id)"
        class="icon-link has-background-white">
        <router-link :to="{ name: '', params: {} }">
          <q-icon name="las la-hourglass-half" color="grey-1" class="q-mr-sm" size="22px" />
        </router-link>
        <span class="indicator p-l-5 has-text-weight-bold">
          1 hr
        </span>
      </div>

      <div
        @click="openComments"
        class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <q-icon name="las la-comments" color="grey-1" class="q-mr-sm" size="22px" />
        </router-link>
        <span class="indicator p-r-5"> 10 </span>
      </div>
      <div
        @click="like"
        class="icon-link">
        <router-link :to="{ name: '', params: {} }">
          <q-icon name="ti-heart" color="grey-1" class="q-mr-sm" size="16px" />
        </router-link>
        <span class="p-r-5 indicator">
          22
        </span>
      </div>
    </div>
    <van-action-sheet
      v-model="showOptions"
      description="Selecciona una opción"
      :actions="actions"
      @cancel="onCancel"
    />
    <van-popup
      v-model="showComments"
      get-container="#app"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '85%' }"
    >
      <div>
        <div class="q-pa-md">
          <p class="text-center q-mb-none"> Comentarios </p>
        </div>
        <q-separator inset />
        <div v-for="(comment, index) in comments" :key="index">
          <comment :comment="comment"></comment>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import { get, post } from "@/api";
import comment from 'src/components/Comment'

export default {
  name: "publication",
  props: {
    publication: {
      type: Object,
      required: true
    }
  },
  components: ['comment'],
  data() {
    return {
      showOptions: false,
      isUserLogged: true,
      showComments: false,
      comments: [
        {
          publishAt: new Date(),
          content: 'Prueba amigo',
        },
        {
          publishAt: new Date(),
          content: 'Prueba amigo 2',
        },
      ],
      actions: [
        {
          name: "Marcar como indebido"
        },
        {
          name: "Proximamente"
        },
        {
          loading: true
        },
      ],
      screenWidth: window.innerWidth
    };
  },
  mounted() {
    // this.showJoinUs();
  },
  methods: {
    onCancel() {

    },
    handlerShowOptions() {
      this.showOptions = true
    },
    openComments() {
      this.showComments = true
    },
    showJoinUs() {
      if (!this.isUserLogged) {
        this.$emit("openShowJoinUs");
        return true;
      }

      return false;
    },
    async like() {
      if (this.showJoinUs) return;
      const { publicationId } = this.publication;

      const { data } = await post("publication/liked", { publicationId });

      this.publication.userLiked = !this.publication.userLiked;
      const operation = !this.publication.userLiked ? -1 : 1;
      this.publication.likes += operation;
    },
    goPublication() {
      const { publicationId } = this.publication;

      this.$router.push({
        name: "Publication",
        params: { publicationId }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$shadow-icons: 0px 0px 3px rgba(150, 150, 150, 1);

.publication {
  background: white;
  position: relative;
  height: 300px;
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
    height: 250px;
    padding: 20px;
    font-weight: bold;
    color: white;

    position: absolute;
    top: 0;

    span {
      display: table-cell;
      vertical-align: middle;
    }
  }

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

  &-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;

    position: absolute;
    bottom: 0;
    width: 100%;


  }
}
</style>
