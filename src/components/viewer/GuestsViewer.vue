<template>
  <div class="guests">
    <ul>
     <li v-for="participant in guests">
       {{participant}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'guests-viewer',
    computed: {
      guests() { return this.$store.getters.guests }
    }
  }
</script>