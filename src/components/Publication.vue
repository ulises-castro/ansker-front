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
          @click="voteUp"
          class="icon-link">
          <router-link :to="{ name: '', params: {} }">
            <q-icon v-if="!publication.userVotedUp" name="ti-heart" color="grey-1" class="q-mr-sm" size="18px" />
            <q-icon v-else name="las la-heart" color="red-5" class="q-mr-sm" size="24px" />
          </router-link>
          <span class="p-r-5 indicator">
            {{ publication.votes }}
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
        <div class="q-pt-sm">
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

    <joinUs :openJoinUs="openJoinUs"></joinUs>

  </section>
</template>
<script>
import { backgroundGradientColor } from 'src/utils'
import Publication from 'src/services/PublicationService'
import comment from 'components/Comment'
import joinUs from 'components/JoinUs.vue'


import { mapGetters } from 'vuex'

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
  components: { comment, joinUs },
  data() {
    return {
      showOptions: false,
      isUserLogged: true,
      openJoinUs: false,
      showCommentBtn: false,
      showComments: false,
      validateComment: '/\d[^_]{2,500}/',
      newComment: '',
      comments: [{}, {}, {}],
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
    },
    ...mapGetters['User', 'isLogged']
  },
  methods: {
    async report() {
      const { publicationId } = this.publication
      const [err, response] = await Publication.report({ publicationId })

      if (err) this.handlerError(err)

      this.$notify({ type: 'success', message: 'Has reportado esta publicación correctamente' })
    },
    async voteUp() {
      const { publicationId } = this.publication

      const [err, response] = await Publication.voteUp(this.publication.publicationId)

      this.publication.userVotedUp = !this.publication.userVotedUp
      const operation = this.publication.userVotedUp ? 1 : -1

      this.publication.votes += operation
    },
    selectedAction(menu) {
      this[menu.action]()
    },
    async sendComment() {
      const content = this.newComment
      const { publicationId } = this.publication

      const [err, response] = await Publication.publishComment({ content, publicationId })

      if (err) this.handlerError(err)

      const comment = {
        content,
        publishAt: new Date(),
        userAuthor: true,
      }

      this.comments.push(comment)
    },
    handlerShowOptions() {
      this.showOptions = true
    },
    openComments() {
      this.showComments = true

      this.loadComments()
    },
    async loadComments() {
      const [err, commentsData] = await Publication.fetchComments(this.publication.publicationId, this.isLogged)

      if (err) this.handlerError(err)

      this.comments = commentsData.data.comments
    },
    openNewComment() {
      if (this.isLogged) return this.openJoinUs = true

      this.showCommentBtn = true
      this.$refs.newComment.focus()
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
