<template lang="html">
  <!-- <div class="column is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen publication"> -->
    <div class="publication">
      <van-image
        lazy-load
        class="background-image"
        src="https://www.theswellelife.com/.a/6a00e54ef16809883301b8d2dcf28f970c-800wi"
        :width="screenWidth"
        :height="300">
      ></van-image>
    <div
      @click="gopublication(publication.id)"
      class="publication-body">
      <span style="text-shadow: 0px 0px 14px #9e9e9e;">
        {{ publication.content }}
      </span>
    </div>
    <div @click="showJoinUs" class="publication-actions">
      <div
        @click="gopublication(publication.id)"
        class="icon-link has-background-white">
        <router-link :to="{ name: '', params: {} }">
          <van-icon name="clock-o"/>
        </router-link>
        <span class="indicator p-l-5 has-text-weight-bold">
          1 hr
        </span>
      </div>
      <div
        @click="(isUserLogged) ? showOptions = true : ''"
        class="icon-link">
        <van-icon name="ellipsis" class="is-size-4" />
      </div>
      <div
        @click="gopublication(publication.id)"
        class="icon-link">
        <span class="indicator p-r-5"> {{ publication.comments }} </span>
        <router-link :to="{ name: '', params: {} }">
          <q-icon name="chat_bubble_outline" color="grey-1" class="q-mr-sm" size="18px" />
        </router-link>
      </div>
      <div
        @click="like"
        class="icon-link">
        <span class="p-r-5 indicator">
          {{ publication.likes }}
        </span>
        <router-link :to="{ name: '', params: {} }">
          <van-icon name="like-o" />
        </router-link>
      </div>
    </div>
    <van-action-sheet
      v-model="showOptions"
      description="Selecciona una opción"
      :actions="actions"
      @cancel="onCancel"
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
// import { get, post } from "@/api";

export default {
  name: "publication",
  props: {
    publication: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showOptions: false,
      isUserLogged: true,
      actions: [
        {
          name: "Reportar"
        },
        {
          name: "Option",
          description: "Description"
        },
        {
          loading: true
        },
        {
          name: "Disabled Option",
          disabled: true
        }
      ],
      screenWidth: window.innerWidth
    };
  },
  mounted() {
    // this.showJoinUs();
  },
  methods: {
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
    gopublication() {
      const { publicationId } = this.publication;

      this.$router.push({
        name: "publication",
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

  &-actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;

    position: absolute;
    bottom: 0;
    width: 100%;

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
