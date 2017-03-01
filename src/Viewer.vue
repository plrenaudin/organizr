<template>
  <div id="application" class="viewer">
    <template v-if="invalid">
      Not a valid event
    </template>
    <template v-else>
      <side-bar @scrollto="scrollTo" :view="true" :eventId="eventId"></side-bar>
      <main>
        {{user}}
        <section id="info" v-if="info.title || info.description">
          <h2>{{$t('app.menu.info')}}</h2>
          <info></info>
        </section>
        <section id="calendar" v-if="dates.length > 0">
          <h2>{{$t('app.menu.datetime')}}</h2>
          <calendar></calendar>
        </section>
        <section id="place" v-if="places.length > 0">
          <h2>{{$t('app.menu.location')}}</h2>
          <place></place>
        </section>
        <section id="checklist" v-if="checklist.length > 0">
          <h2>{{$t('app.menu.checklist')}}</h2>
          <checklist></checklist>
        </section>
        <section id="poll" v-if="polls.length > 0">
          <h2>{{$t('app.menu.polls')}}</h2>
          <poll></poll>
        </section>
        <section id="participant" v-if="guests.length > 0">
          <h2>{{$t('app.menu.guests')}}</h2>
          <guests></guests>
        </section>
      </main>
    </template>

  </div>
</template>
<script>
  import zenscroll from 'zenscroll'
  import Auth from './helpers/Auth.js'
  import SideBar from './components/SideBar.vue'
  import Calendar from './components/viewer/CalendarViewer.vue'
  import Place from './components/viewer/PlaceViewer.vue'
  import Checklist from './components/viewer/ChecklistViewer.vue'
  import info from './components/viewer/InfoViewer.vue'
  import Poll from './components/viewer/PollViewer.vue'
  import Guests from './components/viewer/GuestsViewer.vue'
  import Event from './APIClient/event.js'

  export default {
    name: 'viewer',
    props: ['eventId'],
    components: {Calendar, Place, SideBar, Checklist, info, Poll, Guests},

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
    },
    computed: {
      info() { return this.$store.getters.info },
      dates() { return this.$store.getters.dates },
      places() { return this.$store.getters.places },
      checklist() { return this.$store.getters.checklist },
      polls() { return this.$store.getters.polls },
      guests() { return this.$store.getters.guests },
      user() { return Auth.user() }
    }
  }
</script>