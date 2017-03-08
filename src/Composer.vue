<template>
  <div id="application" class="composer">
    <template v-if="invalid">
      <event-not-found></event-not-found>
    </template>
    <template v-else>
      <side-bar @scrollto="scrollTo" :eventId="eventId"></side-bar>
      <main>
        <section id="info">
          <h2>{{$t('app.menu.info')}}</h2>
          <info></info>
        </section>
        <section id="calendar">
          <h2>{{$t('app.menu.datetime')}}</h2>
          <calendar></calendar>
        </section>
        <section id="place">
          <h2>{{$t('app.menu.location')}}</h2>
          <place></place>
        </section>
        <section id="checklist">
          <h2>{{$t('app.menu.checklist')}}</h2>
          <checklist></checklist>
        </section>
        <section id="poll">
          <h2>{{$t('app.menu.polls')}}</h2>
          <poll></poll>
        </section>
      </main>
    </template>
  </div>
</template>
<script>
  import zenscroll from 'zenscroll'
  import SideBar from './components/SideBar.vue'
  import EventNotFound from './components/EventNotFound.vue'
  import Calendar from './components/composer/Calendar.vue'
  import Place from './components/composer/Place.vue'
  import Checklist from './components/composer/Checklist.vue'
  import info from './components/composer/Info.vue'
  import Poll from './components/composer/Poll.vue'
  import Event from './APIClient/event.js'

  export default {
    name: 'composer',
    components: {EventNotFound, Calendar, Place, SideBar, Checklist, info, Poll},
    props: ['eventId'],
    data() {
      return {
        invalid: false
      }
    },
    methods: {
      scrollTo(element) {
        zenscroll.to(document.getElementById(element), 250)
      }
    },
    created() {
      Event.findById(this.eventId, (err, response) => {
        if(!err) {
          this.$store.commit('loadEvent', response.data)
        } else {
          this.invalid = true
        }
      })
    }
  }
</script>