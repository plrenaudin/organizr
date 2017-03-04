<template>
    <div class="calendar">
      <ul class="dates">
        <li v-for="date in dates">
          <span>{{formatDate(date.day)}}</span><input type="checkbox" :checked="isSelected(date.day)" v-if="!hasTimes(date)" @click="toggleParticipation(date.day)" />
          <ul class="times">
            <li v-for="time in date.times"><span>{{time}}</span><input type="checkbox" :checked="isSelected(date.day, time)" @click="toggleParticipation(date.day, time)" /></li>
          </ul>
        </li>
      </ul>
    </div>
</template>
<script>
import moment from 'moment'
import Formatter from '../../helpers/Formatter.js'
import Utils from '../../helpers/Utils.js'
import Auth from '../../helpers/Auth.js'

export default {
  name: 'calendar-viewer',
  methods: {
    formatDate: Formatter.dateToReadableDate,
    datetimeToString: (date, time) => (date + ' ' + (time || '')).trim(),
    hasTimes(date) { return date.times && date.times.length > 0 },
    toggleParticipation(date, time) {
      this.$store.commit('selectDatetime', this.datetimeToString(date, time))
    },
    attendeesByDate(date, time) {
      return this.attendeesWhoSelectedDate.filter(a => a.dates.includes(this.datetimeToString(date, time)))
    },
    isSelected(date, time) {
      console.log(this.attendeesByDate(date, time).some(a => a.email === Auth.user()), this.datetimeToString(date, time))
      return this.attendeesByDate(date, time).some(a => a.email === Auth.user())
    }
  },
  computed: {
    dates() { return this.$store.getters.dates },
    attendeesWhoSelectedDate() { return this.$store.getters.attendeesWhoSelectedDate },
    user() {return Auth.username()}
  }
}
</script>