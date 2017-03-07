<template>
  <div class="checklist">
    <section class="card">
      <ul>
        <li v-for="item, index in items">
          <checkbox @click.native.prevent="checkItem(item)" :id="'checklist' +index" :value="isChecked(item)" :label="item"></checkbox>
          <span class="small-text volunteers italic spaced" v-show="attendeesChecked(item)">
            {{'(' +$t('app.checklist.volunteers') + ': ' + attendeesChecked(item) +')'}}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import Formatter from '../../helpers/Formatter.js'
  import Auth from '../../helpers/Auth.js'
  import Checkbox from '../Checkbox.vue'
  export default {
    name: 'checklist-viewer',
    components: {Checkbox},
    methods: {
      checkItem(item) {
        this.$store.commit('toggleChecklistItem', item)
      },
      attendeesChecklist(item) {
        return this.attendeesWhoCheckedList.filter(attendee => attendee.checklist.indexOf(item) > -1) || []
      },
      attendeesChecked(item) {
        return this.attendeesChecklist(item).map(a => Formatter.formatNameByEmail(a.email)).join(',')
      },
      isChecked(item) {
        return this.attendeesChecklist(item).some(a => a.email === Auth.user())
      }
    },

    computed: {
      items() { return this.$store.getters.checklist },
      attendeesWhoCheckedList() { return this.$store.getters.attendeesWhoCheckedList }
    },
  }
</script>