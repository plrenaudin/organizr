<template>
  <div class="info">
    <section class="card">
      <h1
        v-if="info.title"
        class="title">{{ info.title }}</h1>
      <pre v-if="info.description">{{ info.description }}</pre>
    </section>
  </div>
</template>
<script>
export default {
  name: 'InfoViewer',

  computed: {
    info() { return this.$store.getters.info; }
  }
};
</script>