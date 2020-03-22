<template lang="html">
  <aside>
    <article class="comment flex flex-wrap width100">
      <div class="comment-header">

      </div>
      <div class="comment-body flex width100">
        <div class="container-avatar">
          <img
          :src="`@/assets/avatars/avatar${comment.avatar}.png`" alt="">
          <img
          src="@/assets/avatars/avatar1.png" alt="">
          {{ comment.avatar }}
        </div>
        <div class="p0-15">
          {{ comment.content }}
        </div>
      </div>
      <div class="comment-footer flex flex-end width100 p-r-15 p-b-5">
        {{ comment.publishAt }}
      </div>
    </article>
  </aside>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

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
