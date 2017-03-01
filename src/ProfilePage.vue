<template>
  <div class="profilePage">
    <h1>{{$t('app.profilePage.title')}} {{username}}</h1>
    <section id="eventList">
      <h2>{{$t('app.profilePage.eventList')}}</h2>
      <my-events></my-events>
    </section>
    <a class="createEvent button" @click="createEvent"><i class="fa fa-plus"></i> {{$t('app.profilePage.createEvent')}}</a>
  </div>
</template>
<script>
  import Event from './APIClient/event.js'
  import Auth from './helpers/Auth.js'
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
    },
    computed: {
      username() { return Auth.username() }
    }
  }
</script>