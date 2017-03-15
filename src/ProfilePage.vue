<template>
  <div class="profilePage">
    <div class="flex center space-between">
      <h1><i class="fa fa-user-o"></i> {{$t('app.profilePage.title')}} {{username}}</h1>
      <div class="button" @click="logout()"><i class="fa fa-sign-out"></i>{{$t('app.logout')}}</div>
    </div>
    <section id="eventList">
      <div class="flex center">
        <h2 class="inline">{{$t('app.profilePage.eventList')}}</h2> <a class="createEvent button" @click="createEvent"><i class="fa fa-plus"></i> {{$t('app.profilePage.createEvent')}}</a>
      </div>
      <my-events></my-events>
    </section>
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
      },
      logout() {
        Auth.logout()
        document.location = '/'
      }
    },
    computed: {
      username() { return Auth.username() }
    }
  }
</script>