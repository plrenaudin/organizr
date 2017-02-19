<template>
  <div class="participants">
    <ul>
     <li v-for="participant in participants">
       {{participant}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'participants-viewer',
    computed: {
      participants() { return this.$store.getters.participants }
    }
  }
</script>