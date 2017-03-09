<template>
  <div class="attendees">

      <div class="hoverme">
        <i class="fa fa-users"></i>{{list.length}}
      </div>

      <ul class="attendeesList">
        <li v-for="attendee,index in list">
          {{attendee.email}}
        </li>
      </ul>

    </div>
  </div>
</template>
<script>


  export default {
    name:'attendees',
    props:['list']
  }
</script>