<template>
  <div class="checklist">
    <ul>
      <li v-for="item, index in items">
        <div class="button" @click="checkItem(item)" v-show="!isChecked(item)">{{$t('app.checklist.checkItem')}}</div>
        <div class="button red" @click="checkItem(item)" v-show="isChecked(item)">{{$t('app.checklist.uncheckItem')}}</div>
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
    computed: {
      items() { return this.$store.getters.checklist },
      attendees() { return this.$store.getters.attendees },
    },
    methods: {
      checkItem(item) {
        this.$store.commit('toggleChecklistItem', item)
      },
      attendeesChecklist(item) {
        return this.attendees.filter(attendee => {
          return attendee.checklist && attendee.checklist.indexOf(item) > -1
        }) || []
      },
      attendeesChecked(item) {
        return this.attendeesChecklist(item).map(a => Formatter.formatNameByEmail(a.email)).join(',')
      },
      isChecked(item) {
        return this.attendeesChecklist(item).some(a => a.email === Auth.user())
      }
    }
  }
</script>