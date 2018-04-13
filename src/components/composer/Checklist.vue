<template>
  <div class="checklist">
    <section class="card">
      <ul v-if="items && items.length > 0">
        <li v-for="(item, index) in items"><i
          class="fa fa-trash action"
          @click="removeItem(index)"/> {{ item }}</li>
      </ul>
      <input
        type="text"
        :placeholder="$t('app.checklist.addItem')"
        @keyup.enter="addItem" >
    </section>
  </div>
</template>
<script>
export default {
  name: 'Checklist',
  computed: {
    items() { return this.$store.getters.checklist; }
  },
  methods: {
    addItem(event) {
      const itemToAdd = event.target.value;
      if(itemToAdd) {
        this.$store.commit('addChecklistItem', itemToAdd);
        event.target.value = '';
      }
    },
    removeItem(index) {
      this.$store.commit('removeChecklistItem', index);
    }
  },
};
</script>