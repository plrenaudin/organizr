<template>
  <div class="profilePage">
    <div class="flex center space-between">
      <h1><i class="fa fa-user-o"/> {{ $t('app.profilePage.title') }}</h1>
      <div 
        class="button" 
        @click="logout()"><i class="fa fa-sign-out"/>{{ $t('app.logout') }}</div>
    </div>
    <section 
      id="eventList" 
      class="card">
      <h2><i class="fa fa-calendar"/> {{ $t('app.profilePage.eventList') }}</h2>
      <my-events @create="createEvent"/>
    </section>
  </div>
</template>
<script>
import Event from './APIClient/event.js';
import Auth from './helpers/Auth.js';
import MyEvents from './components/MyEvents.vue';
export default {
  name: 'ProfilePage',

  components: {MyEvents},
  methods: {
    createEvent() {
      Event.create((err, response) => {
        if(!err) {
          this.$router.push('/edit/' + response.data._id);
        } else {
          console.error(err);
          //TODO error handling
        }
      });
    },
    logout() {
      Auth.logout();
      document.location = '/';
    }
  }
};
</script>