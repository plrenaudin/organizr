<template>
  <div class="attendees">

      <div class="hoverme">
        <i class="fa fa-users"></i>{{list.length}}
      </div>

      <ul class="attendeesList">
        <li v-for="attendee,index in list">
          <i class="fa fa-user" :style="`color:${generateColor(attendee.email)}`"></i>
          {{attendee.email}}
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
import {generateColor} from "../helpers/Utils"

  export default {
    name:'attendees',
    props:['list'],
    methods: {
      generateColor
    }
  }
</script>