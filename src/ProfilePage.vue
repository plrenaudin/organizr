<template>
  <div class="profile">
    <h1>Profile</h1>
    <my-events></my-events>
    <div class="createEvent" @click="createEvent">createEvent in DB</div>
  </div>
</template>
<script>
  import Event from './APIClient/event.js'
  import MyEvents from './components/MyEvents.vue'
  export default {
    name: 'profile-page',
    components: {MyEvents},
    methods: {
      createEvent() {
        Event.create((err, response) => {
          if(!err) {
            this.$router.push('/edit/' + response.data._id)
          } else {
            console.error(err)
            //TODO error handling
          }
        })
      }
    }
  }
</script>