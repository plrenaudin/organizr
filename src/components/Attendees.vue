<template>
  <div class="attendees">

    <div class="hoverme">
      <i class="fa fa-users"/>{{ list.length }}
    </div>

    <ul class="attendeesList">
      <li
        :key="attendee.email"
        v-for="attendee in list">
        <i
          class="fa fa-user"
          :style="`color:${generateColor(attendee.email)}`"/>
        {{ attendee.email }}
      </li>
    </ul>

  </div>
</template>
<script>
import {generateColor} from '../helpers/Utils';

export default {
  name:'Attendees',
  props:['list'],
  methods: {
    generateColor
  }
};
</script>