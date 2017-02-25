<template>
  <div class="profile">
    this is the profile
    <div class="createEvent" @click="createEvent">createEvent in DB</div>
  </div>
</template>
<script>
  import Event from './APIClient/event.js'
  import Auth from './helpers/Auth.js'
  export default {
    name: 'profile-page',
    methods: {
      createEvent() {
        Event.create(this.user, (err, response) => {
          if(!err) {
            this.$router.push('/edit/' + response.data._id)
          } else {
            //TODO error handling
          }
        })
      }
    }
  }
</script>