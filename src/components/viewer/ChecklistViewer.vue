<template>
  <div class="checklist">
    <ul>
      <li v-for="item, index in items">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'checklist-viewer',
    computed: {
      items() { return this.$store.getters.checklist }
    }
  }
</script>