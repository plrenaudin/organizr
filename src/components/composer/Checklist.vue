<template>
  <div class="checklist">
    <section class="card">
      <ul>
        <li v-for="item, index in items"><i class="fa fa-trash action" @click="removeItem(index)"></i> {{item}}</li>
      </ul>
      <input type="text" :placeholder="$t('app.checklist.addItem')" @keyup.enter="addItem" />
    </section>
  </div>
</template>
<script>
  export default {
    name: 'checklist',
    methods: {
      addItem(event) {
        const itemToAdd = event.target.value
        if(itemToAdd) {
          this.$store.commit('addChecklistItem', itemToAdd)
          event.target.value = ''
        }
      },
      removeItem(index) {
        this.$store.commit('removeChecklistItem', index)
      }
    },
    computed: {
      items() { return this.$store.getters.checklist }
    }
  }
</script>