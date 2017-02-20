<template>
    <div class="calendar">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="date in dates" :colspan="date.times.length || 1">
              {{formatDate(date.date)}}
            </th>
          </tr>
          <tr v-if="hasTimes">
            <th>&nbsp;</th>
            <template v-for="date in dates">
              <th v-if="date.times.length === 0">&nbsp;</th>
              <th v-for="time in date.times">{{time}}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>participantNameTODO</td>
            <template v-for="date in dates">
              <template v-if="date.times.length > 0">
                <td v-for="time in date.times" class="selectable" @click="toggleParticipation(date.date,time)">&nbsp;</td>
              </template>
              <template v-else>
                <td class="selectable" @click="toggleParticipation(date.date)">&nbsp;</td>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
import moment from 'moment'
import Formatter from '../../helpers/Formatter.js'
import Utils from '../../helpers/Utils.js'

export default {
  name: 'calendar-viewer',
  methods: {
    formatDate: Formatter.dateToReadableDate,
    toggleParticipation(date,time) {
      console.log(date,time)
    }
  },
  computed: {
    dates() { return this.$store.getters.dates },
    participants() { return this.$store.getters.participants },
    hasTimes() { return this.dates.some(item => item.times.length > 0) }
  }
}
</script>