<template>
  <div class="myEvents">
    <ul>
      <li v-for="event in events">{{event._id}}</li>
    </ul>
  </div>
</template>
<script>
import Event from '../APIClient/event.js'
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
  }
}
</script>