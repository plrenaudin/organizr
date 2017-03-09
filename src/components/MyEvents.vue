<template>
  <div class="myEvents">
    <ul>
      <li v-for="event in events" @click="$router.push('/'+event._id)">
        <div class="name">
          {{formatEventName(event)}}
        </div>
        <div class="dates">
          <i class="fa fa-calendar"></i> {{getEventDates(event)}}
        </div>
        <attendees :list="event.attendees"></attendees>
      </li>
    </ul>
  </div>
</template>
<script>
import Event from '../APIClient/event.js'
import Formatter from '../helpers/Formatter.js'
import Utils from '../helpers/Utils.js'
import Attendees from './Attendees.vue'

export default {
  name:'my-events',
  components:{Attendees},
  data() {
    return {
      events:[]
    }
  },
  created() {
    Event.listMyEvents((err, response) => {
      if(err) {
        console.error(err)
      } else {
        this.events = response.data
      }
    })
  },
  methods: {
    formatEventName: Formatter.formatEventName,
    getEventDates(event) {
      if(event && event.dates && event.dates.length > 0) {
        const result = event.dates.slice().sort(Utils.compareDayAsc)
        return Formatter.dateToReadableDate(result[0].day) +
        ' - ' + Formatter.dateToReadableDate(result[result.length - 1].day)
      } else {
        return ' ? - ? '
      }
    }
  }
}
</script>