<template>
  <div id="page">
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

export default {
  name: 'app',
  components: {Calendar, Place, SideBar, Checklist, Intro, Poll},
  methods: {
    scrollTo(element) {
      zenscroll.to(document.getElementById(element), 250)
    }
  }
}
</script>

<style lang="sass">
  @import './assets/scss/styles.scss';
</style>
