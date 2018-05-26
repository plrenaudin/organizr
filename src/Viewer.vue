<template>
  <div 
    id="application" 
    class="viewer">
    <main>
      <loading v-show="!loaded"/>
      <template v-show="loaded">
        <side-bar 
          @scrollto="scrollTo" 
          :view="true" 
          :event-id="eventId"/>
        <template v-if="invalid">
          <event-not-found/>
        </template>
        <template v-if="!invalid && !isNotEmtpy">
          <div class="splash">
            <i class="fa fa-ban fa-2x"/>
            <span>
              {{ $t('app.emptyEvent') }}
            </span>
          </div>
        </template>
        <template v-else>
          <section 
            id="info" 
            v-if="info.title || info.description">
            <h2>{{ $t('app.menu.info') }}</h2>
            <info/>
          </section>
          <section 
            id="calendar" 
            v-if="dates.length > 0">
            <h2>{{ $t('app.menu.datetime') }}</h2>
            <helper>
              <span v-html="$t('app.help.calendarViewer')"/>
            </helper>
            <calendar/>
          </section>
          <section 
            id="place" 
            v-if="places.length > 0">
            <h2>{{ $t('app.menu.location') }}</h2>
            <helper>
              <span v-html="$t('app.help.placeViewer')"/>
            </helper>
            <place/>
          </section>
          <section 
            id="checklist" 
            v-if="checklist.length > 0">
            <h2>{{ $t('app.menu.checklist') }}</h2>
            <helper>
              <span v-html="$t('app.help.checklistViewer')"/>
            </helper>
            <checklist/>
          </section>
          <section 
            id="poll" 
            v-if="polls.length > 0">
            <h2>{{ $t('app.menu.polls') }}</h2>
            <helper>
              <span v-html="$t('app.help.pollsViewer')"/>
            </helper>
            <poll/>
          </section>
        </template>
      </template>
    </main>
  </div>
</template>
<script>
import zenscroll from 'zenscroll';
import Auth from './helpers/Auth.js';
import EventNotFound from './components/EventNotFound.vue';
import Loading from './components/Loading.vue';
import SideBar from './components/SideBar.vue';
import Helper from './components/Helper.vue';
import Calendar from './components/viewer/CalendarViewer.vue';
import Place from './components/viewer/PlaceViewer.vue';
import Checklist from './components/viewer/ChecklistViewer.vue';
import info from './components/viewer/InfoViewer.vue';
import Poll from './components/viewer/PollViewer.vue';
import Event from './APIClient/event.js';

export default {
  name: 'Viewer',
  components: {EventNotFound, Helper, Loading, Calendar, Place, SideBar, Checklist, info, Poll},
  props: ['eventId'],

  data() {
    return {
      invalid: false,
      loaded: false
    };
  },
  computed: {
    info() { return this.$store.getters.info; },
    dates() { return this.$store.getters.dates; },
    places() { return this.$store.getters.places; },
    checklist() { return this.$store.getters.checklist; },
    polls() { return this.$store.getters.polls; },
    attendees() { return this.$store.getters.attendees; },
    isNotEmtpy() {
      return this.info.title || this.info.description || this.dates.length > 0 || this.places.length > 0 || this.checklist.length > 0 || this.polls.length > 0;
    },
    user() { return Auth.user(); }
  },
  created() {
    Event.findById(this.eventId, (err, response) => {
      if(!err) {
        this.$store.commit('loadEvent', response.data);
      } else {
        this.invalid = true;
      }
      this.$nextTick(() => {
        this.loaded = true;
      });
    });
  },

  methods: {
    scrollTo(element) {
      zenscroll.to(document.getElementById(element), 250);
    }
  },
};
</script>