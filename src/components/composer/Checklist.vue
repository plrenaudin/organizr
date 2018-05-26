<template>
  <div class="checklist">
    <section class="card">
      <ul v-if="items && items.length > 0">
        <li :key="index" v-for="(item, index) in items"><i
          class="fa fa-trash action"
          @click="removeItem(index)"/>
          <content-editable @change="editItem(index)" :value="item"></content-editable>
        </li>
      </ul>
      <input
        type="text"
        :placeholder="$t('app.checklist.addItem')"
        @keyup.enter="addItem" >
    </section>
  </div>
</template>
<script>
import ContentEditable from "./ContentEditable.vue"
export default {
  name: 'Checklist',
  components: {ContentEditable},
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
    editItem(index) {
      const value = event.target.value;
      this.$store.commit('editChecklistItem', {index,value});
    },
    removeItem(index) {
      this.$store.commit('removeChecklistItem', index);
    }
  },
};
</script>