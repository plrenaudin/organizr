<template>
  <div id="page">
    <aside>
      <section id="user">
        <figure class="userPicture">
          <i class="fa fa-2x fa-user-o"></i>
        </figure>
        Pilou
      </section>
      <section id="menuSection">
        <nav>
          <ul>
            <li class="color1" @click="scrollTo('calendar')">
              {{$t('app.menu.datetime')}}<i class="fa fa-calendar"></i>
            </li>
            <li class="color2" @click="scrollTo('location')">
              {{$t('app.menu.location')}}<i class="fa fa-map-marker"></i>
            </li>
            <li class="color3" @click="scrollTo('checklist')">
              {{$t('app.menu.checklist')}}<i class="fa fa-list"></i>
            </li>
            <li class="color4" @click="scrollTo('polls')">
              {{$t('app.menu.polls')}}<i class="fa fa-bullhorn"></i>
            </li>
            <li class="color5" @click="scrollTo('participants')">
              {{$t('app.menu.participants')}}<i class="fa fa-users"></i>
            </li>
          </ul>
        </nav>
      </section>
    </aside>
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

export default {
  name: 'app',
  components: {Calendar},
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
