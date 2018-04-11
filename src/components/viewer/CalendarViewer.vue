<template>
  <div class="calendar">
    <ul class="dates card-group">
      <li v-for="date in dates">
        <section class="card">
          <div class="day">
            <span><i class="fa fa-calendar"/> {{ formatDate(date.day) }}</span>
            <checkbox
              @click.native.prevent="toggleParticipation(date.day)"
              :id="date.day"
              :value="isSelected(date.day)"
              v-if="!hasTimes(date)" />
            <attendees
              :list="attendeesByDate(date.day)"
              v-if="date.times.length === 0"/>
          </div>
          <ul class="times">
            <li v-for="time in date.times">
              <span><i class="fa fa-clock-o"/> {{ time }}</span>
              <checkbox
                @click.native.prevent="toggleParticipation(date.day, time)"
                :id="date.day+time"
                :value="isSelected(date.day, time)" />
              <attendees :list="attendeesByDate(date.day, time)"/>
            </li>
          </ul>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import Formatter from '../../helpers/Formatter.js';
import Auth from '../../helpers/Auth.js';
import Checkbox from '../Checkbox.vue';
import Attendees from '../Attendees.vue';

export default {
  name: 'CalendarViewer',
  components: {Checkbox, Attendees},
  computed: {
    dates() { return this.$store.getters.dates; },
    attendeesWhoSelectedDate() { return this.$store.getters.attendeesWhoSelectedDate; },
    user() {return Auth.username();}
  },

  methods: {
    formatDate: Formatter.dateToReadableDate,
    datetimeToString: (date, time) => (date + ' ' + (time || '')).trim(),
    hasTimes(date) { return date.times && date.times.length > 0; },
    toggleParticipation(date, time) {
      this.$store.commit('selectDatetime', this.datetimeToString(date, time));
    },
    attendeesByDate(date, time) {
      return this.attendeesWhoSelectedDate.filter(a => a.dates.includes(this.datetimeToString(date, time)));
    },
    isSelected(date, time) {
      return this.attendeesByDate(date, time).some(a => a.email === Auth.user());
    }
  },
};
</script>