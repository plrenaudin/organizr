<template>
  <div class="checklist">
    <ul>
      <li v-for="item, index in items">
        <input type="checkbox" @click="checkItem(item)" :checked="isChecked(item)" />
        <span>{{item}}</span>

        <span class="small-text volunteers italic spaced" v-show="attendeesChecked(item)">{{'(' +$t('app.checklist.volunteers') + ': ' + attendeesChecked(item) +')'}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import Formatter from '../../helpers/Formatter.js'
  import Auth from '../../helpers/Auth.js'
  export default {
    name: 'checklist-viewer',

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