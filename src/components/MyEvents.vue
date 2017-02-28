<template>
  <div class="myEvents">
    <ul>
      <li v-for="event in events" @click="$router.push('/'+event._id)">{{formatEventName(event)}}</li>
    </ul>
  </div>
</template>
<script>
import Event from '../APIClient/event.js'
import Formatter from '../helpers/Formatter.js'

export default {
  name:'my-events',
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
    formatEventName: Formatter.formatEventName
  }
}
</script>