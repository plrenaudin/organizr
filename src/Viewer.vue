<template>
  <div class="viewer">
    <side-bar @scrollto="scrollTo" :view="true" :eventId="eventId"></side-bar>
    <main>
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

  </div>
</template>
<script>
  import zenscroll from 'zenscroll'
  import SideBar from './components/SideBar.vue'
  import Calendar from './components/viewer/CalendarViewer.vue'
  import Place from './components/viewer/PlaceViewer.vue'
  import Checklist from './components/viewer/ChecklistViewer.vue'
  import info from './components/viewer/InfoViewer.vue'
  import Poll from './components/viewer/PollViewer.vue'
  import Guests from './components/viewer/GuestsViewer.vue'

  export default {
    name: 'viewer',
    props: ['eventId'],
    components: {Calendar, Place, SideBar, Checklist, info, Poll, Guests},

    methods: {
      scrollTo(element) {
        zenscroll.to(document.getElementById(element), 250)
      }
    },
    created() {
      let event = {"info":{"title":"info title","description":"info desc"},"dates":[{"date":"2017-02-21","times":["11:00","02:00","13:00"]},{"date":"2017-02-22","times":["15:00","19:00"]},{"date":"2017-02-23","times":[]},{"date":"2017-02-28","times":["15:00","04:59","23:00","05:59"]},{"date":"2017-02-27","times":[]}],"places":[{"name":"Paris, France","valid":"Paris, France"}],"checklist":[{"name":"itemun"},{"name":"item2"}],"polls":[],"guests":[],"participants":[]};
      this.$store.commit('loadEvent', event)
    },
    computed: {
      info() { return this.$store.getters.info },
      dates() { return this.$store.getters.dates },
      places() { return this.$store.getters.places },
      checklist() { return this.$store.getters.checklist },
      polls() { return this.$store.getters.polls },
      guests() { return this.$store.getters.guests },
    }
  }
</script>