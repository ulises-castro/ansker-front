<template lang="html">
  <!-- <div class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen publication"> -->
    <section v-if="Object.keys(publication).length" class="publication" :style="{ background }">
    <div style="position: absolute; top: 0; right: 0; z-index: 100">
      <div class="row justify-end q-pa-sm icon-link"
        @click="handlerShowOptions">
        <q-icon name="las la-ellipsis-h" color="white" class="q-mr-sm" size="30px" />
      </div>
    </div>
    <div
      @click="goPublication(publication.id)"
      class="publication-body">
      <span>
        {{ publication.content }}
      </span>
    </div>
    <div class="publication-actions row">
      <div class="col-4">
        <span class="text-white text-bold q-pl-md">
          {{ publication.location.city }}
        </span>
      </div>
      <div class="row col-8 justify-around">
        <div
          @click="openComments"
          class="icon-link">
          <router-link :to="{ name: '', params: {} }">
            <q-icon name="las la-comments" color="grey-1" class="q-mr-sm" size="24px" />
          </router-link>
          <span class="indicator p-r-5">
            {{ publication.comments }}
          </span>
        </div>
        <div
          @click="like"
          class="icon-link">
          <router-link :to="{ name: '', params: {} }">
            <q-icon name="ti-heart" color="grey-1" class="q-mr-sm" size="18px" />
          </router-link>
          <span class="p-r-5 indicator">
            {{ publication.likes }}
          </span>
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model="showOptions"
      description="Selecciona una opción"
      @select="selectedAction"
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
        <div>
          <van-form validate-first>
            <van-field
              v-model="newComment"
              ref="newComment"
              rows="2"
              @click="openNewComment"
              autosize
              label=""
              name="validateComment"
              type="textarea"
              autofocus
              maxlength="500"
              placeholder="Escribir un comentario"
              :show-word-limit="showCommentBtn"
              :rules="[{ validateComment, message: 'Error message' }]"
            >
            </van-field>
            <div v-if="showCommentBtn" class="row justify-end q-py-sm">
              <van-button  @click="sendComment" size="large" type="primary">Comentar</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-popup>
  </section>

  <section v-else>
    <q-card flat bordered square >
      <q-skeleton height="250px" square animation="fade">
        <div style="height: 180px">
          <div class="row justify-end q-px-sm">
            <q-icon name="las la-ellipsis-h" color="grey-1" class="q-mr-sm" size="25px" />
          </div>
        </div>
        <div class="q-pa-sm row items-center justify-between no-wrap full-width" style="position: absolute; bottom: 0">
          <div class="row items-center">
            <q-icon name="las la-hourglass-half" color="grey-1" class="q-mr-sm" size="20px" />
            <q-skeleton type="text" width="30px" />
          </div>

          <div class="row items-center">
            <q-icon name="las la-comments" color="grey-1" class="q-mr-sm" size="20px" />
            <q-skeleton type="text" width="30px" />
          </div>

          <div class="row items-center">
            <q-icon name="ti-heart" color="grey-1" class="q-mr-sm" size="20px" />
            <q-skeleton type="text" width="30px" />
          </div>
        </div>
      </q-skeleton>
    </q-card>
  </section>

</template>

<script>
import { backgroundGradientColor } from 'src/utils'
import Publication from 'src/services/PublicationService'
import comment from 'src/components/Comment'

export default {
  name: "publication",
  props: {
    publication: {
      type: Object,
      required: true
    },
    handlerError: {
      type: Function,
    }
  },
  components: { comment },
  data() {
    return {
      showOptions: false,
      isUserLogged: true,
      showCommentBtn: false,
      showComments: false,
      validateComment: '/\d[^_]{2,500}/',
      newComment: '',
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
          name: "Reportar publicación",
          action: 'report'
        },
      ],
      screenWidth: window.innerWidth
    };
  },
  mounted() {
  },
  watch: {
    showComments(show) {
      this.showCommentBtn = !show
    }
  },
  computed: {
    background() {
      return backgroundGradientColor(this.publication.backgroundColor)
    }
  },
  methods: {
    async report() {
      const { publicationId } = this.publication
      const [err, response] = await Publication.report({ publicationId })

      if (err) this.handlerError(err)

      this.$notify({ type: 'success', message: 'Has reportado esta publicación correctamente' })
    },
    selectedAction(menu) {
      this[menu.action]()
    },
    onCancel() {
    },
    async sendComment() {
      const content = this.newComment
      const { publicationId } = this.publication

      const [err, response] = await Publication.publishComment({ content, publicationId })

      if (err) this.handlerError(err)

      this.comments.push(comment)
    },
    handlerShowOptions() {
      this.showOptions = true
    },
    openComments() {
      this.showComments = true
    },
    openNewComment() {
      this.showCommentBtn = true
      this.$refs.newComment.focus()
    },
    async like() {
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
  height: 350px;
  width: 100%;
  border: 1px solid #e4e4e4;

  &-header {
    padding: 10px;
    padding-bottom: 0;
  }

  .indicator {
    color: white;
    font-weight: bold;
    // text-shadow: $shadow-icons;
  }

  .liked {
    color: #ff0088;
  }

  &-body {
    display: table;
    font-size: 20px;
    text-align: center;
    width: 100%;
    height: 250px;
    padding: 20px;
    font-weight: bold;
    color: white;

    position: absolute;
    top: 35px;

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
      // text-shadow: $shadow-icons;
    }

    a {
      color: #fff;
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    padding: 15px 0;

    position: absolute;
    bottom: 0;
    width: 100%;


  }
}
</style>
