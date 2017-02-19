<template>
  <div class="composer">

    <side-bar @scrollto="scrollTo"></side-bar>
    <main>
      <section id="intro">
        <h2>{{$t('app.menu.intro')}}</h2>
        <intro></intro>
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
  import Calendar from './components/Calendar.vue'
  import SideBar from './components/SideBar.vue'
  import Place from './components/Place.vue'
  import Checklist from './components/Checklist.vue'
  import Intro from './components/Intro.vue'
  import Poll from './components/Poll.vue'
  import Participants from './components/Participants.vue'

  export default {
    name: 'composer',
    components: {Calendar, Place, SideBar, Checklist, Intro, Poll, Participants},
    props: ['eventId'],
    methods: {
      scrollTo(element) {
        zenscroll.to(document.getElementById(element), 250)
      }
    },
    created() {
      console.log('init, porpsId', this.eventId)
      let event = {"event":{"info":{"title":"my intro","description":"my desc"},"dates":[{"date":"2017-02-14","times":["15:00"]},{"date":"2017-02-15","times":["16:00"]},{"date":"2017-02-16","times":["18:00"]}],"places":[{"name":"Versailles, France","valid":"Versailles, France"}],"checklist":[{"name":"my checklist"},{"name":"myitems"}],"polls":[{"question":"question1","choices":[{"name":"choice11"},{"name":"choice12"}]},{"question":"question2","choices":[{"name":"choice21"},{"name":"choice22"}]}],"participants":["participant","1","participant2"]}};
      this.$store.commit('loadEvent', event)
    }
  }
</script>