<template>
  <div class="info">
    <h1 v-if="info.title">{{info.title}}</h1>
    <p v-if="info.description">{{info.description}}</p>
  </div>
</template>
<script>
  let timeoutID = null
  let timeoutDuration = 1000 // Default timeout duration
  export default {
    name: 'info-viewer',

    computed: {
      info() { return this.$store.getters.info }
    }
  }
</script>