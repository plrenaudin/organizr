<template>
  <div id="application" class="viewer">
    <loading v-show="!loaded"></loading>
    <template v-show="loaded">
      <side-bar @scrollto="scrollTo" :view="true" :eventId="eventId"></side-bar>
        <main>
        <template v-if="invalid">
          <event-not-found></event-not-found>
        </template>
        <template v-if="!invalid && !isNotEmtpy">
          <div class="splash">
            <i class="fa fa-ban fa-2x"></i>
            <span>
              {{$t('app.emptyEvent')}}
            </span>
          </div>
        </template>
        <template v-else>
          <section id="info" v-if="info.title || info.description">
            <h2>{{$t('app.menu.info')}}</h2>
            <info></info>
          </section>
          <section id="calendar" v-if="dates.length > 0">
            <h2>{{$t('app.menu.datetime')}}</h2>
            <helper>
              <span v-html="$t('app.help.calendarViewer')"></span>
            </helper>
            <calendar></calendar>
          </section>
          <section id="place" v-if="places.length > 0">
            <h2>{{$t('app.menu.location')}}</h2>
            <helper>
              <span v-html="$t('app.help.placeViewer')"></span>
            </helper>
            <place></place>
          </section>
          <section id="checklist" v-if="checklist.length > 0">
            <h2>{{$t('app.menu.checklist')}}</h2>
            <helper>
              <span v-html="$t('app.help.checklistViewer')"></span>
            </helper>
            <checklist></checklist>
          </section>
          <section id="poll" v-if="polls.length > 0">
            <h2>{{$t('app.menu.polls')}}</h2>
            <helper>
              <span v-html="$t('app.help.pollsViewer')"></span>
            </helper>
            <poll></poll>
          </section>
        </template>
      </template>
    </main>
  </div>
</template>
<script>
  import zenscroll from 'zenscroll'
  import Auth from './helpers/Auth.js'
  import EventNotFound from './components/EventNotFound.vue'
  import Loading from './components/Loading.vue'
  import SideBar from './components/SideBar.vue'
  import Helper from './components/Helper.vue'
  import Calendar from './components/viewer/CalendarViewer.vue'
  import Place from './components/viewer/PlaceViewer.vue'
  import Checklist from './components/viewer/ChecklistViewer.vue'
  import info from './components/viewer/InfoViewer.vue'
  import Poll from './components/viewer/PollViewer.vue'
  import Event from './APIClient/event.js'

  export default {
    name: 'viewer',
    props: ['eventId'],
    components: {EventNotFound, Helper, Loading, Calendar, Place, SideBar, Checklist, info, Poll},

    data() {
      return {
        invalid: false,
        loaded: false
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
          this.loaded = true
        } else {
          this.loaded = true
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
      attendees() { return this.$store.getters.attendees },
      isNotEmtpy() {
        return this.info.title || this.info.description || this.dates.length > 0 || this.places.length > 0 || this.checklist.length > 0 || this.polls.length > 0
      },
      user() { return Auth.user() }
    }
  }
</script>