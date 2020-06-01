<template>
  <section>
    <!-- <div class="row items-center">
      <q-icon name="ti-heart" color="grey-1" class="q-mr-sm" size="20px" />
      <q-skeleton type="text" width="30px" />
    </div> -->
     <q-item v-if="!Object.keys(comment).length">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <div v-else>
        <div class="w-full q-pa-md q-pb-sm">
          <div class="text-grey-10">
            <span v-if="!comment.userAuthor">
              Anónimo
            </span>
            <span v-else>
              Tú
            </span>
          </div>
          <span class="text-grey-8">
            {{ comment.content }}
          </span>
        </div>
        <q-separator inset />
      </div>
  </section>
</template>
<script>
export default {
  name: 'comment',
  props: ['comment'],
  data() {
    return {

    }
  },
  created() {

  },
}
</script>