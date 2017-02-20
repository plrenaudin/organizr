<template>
  <div class="composer">

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
      <section id="participant">
        <h2>{{$t('app.menu.participants')}}</h2>
        <participants></participants>
      </section>
    </main>
  </div>
</template>
<script>
  import zenscroll from 'zenscroll'
  import SideBar from './components/SideBar.vue'
  import Calendar from './components/composer/Calendar.vue'
  import Place from './components/composer/Place.vue'
  import Checklist from './components/composer/Checklist.vue'
  import info from './components/composer/Info.vue'
  import Poll from './components/composer/Poll.vue'
  import Participants from './components/composer/Participants.vue'

  export default {
    name: 'composer',
    components: {Calendar, Place, SideBar, Checklist, info, Poll, Participants},
    props: ['eventId'],
    methods: {
      scrollTo(element) {
        zenscroll.to(document.getElementById(element), 250)
      }
    },
    created() {
      let event = {"info":{"title":"mon info","description":"monf cintenoo"},"dates":[{"date":"2017-02-21","times":[{"time":"15:00"}]},{"date":"2017-02-23","times":[{"time":"16:00"},{"time":"18:00"}]},{"date":"2017-02-22","times":[]}],"places":[{"name":"Paris, France","valid":"Paris, France"}],"checklist":[{"name":"item"},{"name":"itm2"}],"polls":[],"participants":["participant1","participant2"]};
      this.$store.commit('loadEvent', event)
    }
  }
</script>