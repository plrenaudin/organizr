<template>
  <div id="page">
    <side-bar @scrollto="scrollTo"></side-bar>
    <main>
      <section id="calendar">
        <h2>{{$t('app.menu.datetime')}}</h2>
        <calendar v-model="eventDates"></calendar>
        <ul>
          <li v-for="date in eventDates">{{date.date}} {{date.hours}}:{{date.minutes}}</li>
        </ul>
      </section>
      <section id="location">
        <h2>{{$t('app.menu.location')}}</h2>
      </section>
      <section id="checklist">
        <h2>{{$t('app.menu.checklist')}}</h2>
      </section>
      <section id="polls">
        <h2>{{$t('app.menu.polls')}}</h2>
      </section>
      <section id="participants">
        <h2>{{$t('app.menu.participants')}}</h2>
      </section>
    </main>
  </div>
</template>

<script>
import zenscroll from 'zenscroll'
import Calendar from './components/Calendar.vue'
import SideBar from './components/SideBar.vue'

export default {
  name: 'app',
  components: {Calendar, SideBar},
  data () {
    return {
      eventDates:[]
    }
  },
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
