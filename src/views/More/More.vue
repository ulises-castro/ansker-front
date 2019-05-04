<template>
  <containerApp>
    <section class="width100 height100 flex flex-center flex-middle">
      <div>
        <b-button
          @click="closeSession()"
          type="is-light has-text-primary has-text-weight-bold is-size-6" rounded>
          Cerrar sesión
        </b-button>
      </div>
    </section>
  </containerApp>
</template>
<script>
export default {
  name: 'More',
  data() {
    return {};
  },
  methods: {
    closeSession() {
      
    }
  }
}
</script>
