<template>
  <div class="myEvents">
    <ul>
      <li v-if="events.length === 0">{{$t('app.profilePage.noEvents')}}</li>
      <li v-for="event in events" @click="$router.push('/'+event._id)">
        <div class="name">
          {{formatEventName(event)}}
        </div>
        <div class="dates">
          <i class="fa fa-calendar"></i> {{getEventDates(event)}}
          <i class="fa fa-pencil" :title="$t('app.profilePage.isAdmin')" v-if="isAdmin(event)"></i>
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
import Auth from '../helpers/Auth.js'

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
        this.events = response.data.sort((a,b) => {
          return Utils.getTimestampFromId(b._id) - Utils.getTimestampFromId(a._id)
        })
      }
    })
  },
  methods: {
    formatEventName: Formatter.formatEventName,
    isAdmin(event) {
      return event.admin === Auth.user()
    },
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