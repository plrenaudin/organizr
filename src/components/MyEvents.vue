<template>
  <div class="myEvents">
    <div v-show="!loading">
      <ul v-if="events.length > 0">
        <li v-for="event in events" @click="$router.push('/'+event._id)">
          <h2>
            {{formatEventName(event)}}
          </h2>
          <div class="dates">
            <i class="fa fa-calendar"></i> {{getEventDates(event)}}
            <i class="fa fa-pencil" :title="$t('app.profilePage.isAdmin')" v-if="isAdmin(event)"></i>
          </div>
          <attendees :list="event.attendees"></attendees>
        </li>
      </ul>
      <div class="noEvents" v-else>
        <i class="fa fa-2x fa-frown-o"></i>
        <span>{{$t('app.profilePage.noEvents')}}</span>
      </div>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>
<script>
import Event from '../APIClient/event.js'
import Formatter from '../helpers/Formatter.js'
import Utils from '../helpers/Utils.js'
import Attendees from './Attendees.vue'
import Loading from './Loading.vue'
import Auth from '../helpers/Auth.js'

export default {
  name:'my-events',
  components:{Attendees, Loading},
  data() {
    return {
      events:[],
      loading: false
    }
  },
  created() {
    this.loading = true;
    Event.listMyEvents((err, response) => {
      if(err) {
        console.error(err)
      } else {
        this.events = response.data.sort((a,b) => {
          return Utils.getTimestampFromId(b._id) - Utils.getTimestampFromId(a._id)
        })
      }
      this.loading = false;
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