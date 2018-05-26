<template>
  <div 
    id="application" 
    class="composer">
    <template v-if="invalid">
      <event-not-found/>
    </template>
    <template v-else>
      <loading v-show="!loaded"/>
      <template v-show="loaded">
        <side-bar 
          @scrollto="scrollTo" 
          :event-id="eventId"/>
        <main>
          <section id="info">
            <h2>{{ $t('app.menu.info') }}</h2>
            <helper>
              <span v-html="$t('app.help.info')"/>
            </helper>
            <info/>
          </section>
          <section id="calendar">
            <h2>{{ $t('app.menu.datetime') }}</h2>
            <helper>
              <span v-html="$t('app.help.calendar')"/>
            </helper>
            <calendar/>
          </section>
          <section id="place">
            <h2>{{ $t('app.menu.location') }}</h2>
            <helper>
              <span v-html="$t('app.help.place')"/>
            </helper>
            <place/>
          </section>
          <section id="checklist">
            <h2>{{ $t('app.menu.checklist') }}</h2>
            <helper>
              <span v-html="$t('app.help.checklist')"/>
            </helper>
            <checklist/>
          </section>
          <section id="poll">
            <h2>{{ $t('app.menu.polls') }}</h2>
            <helper>
              <span v-html="$t('app.help.polls')"/>
            </helper>
            <poll/>
          </section>
        </main>
      </template>
    </template>
  </div>
</template>
<script>
import zenscroll from 'zenscroll';
import SideBar from './components/SideBar.vue';
import Helper from './components/Helper.vue';
import Loading from './components/Loading.vue';
import EventNotFound from './components/EventNotFound.vue';
import Calendar from './components/composer/Calendar.vue';
import Place from './components/composer/Place.vue';
import Checklist from './components/composer/Checklist.vue';
import info from './components/composer/Info.vue';
import Poll from './components/composer/Poll.vue';
import Event from './APIClient/event.js';

export default {
  name: 'Composer',
  components: {EventNotFound, Loading, Helper, Calendar, Place, SideBar, Checklist, info, Poll},
  props: ['eventId'],
  data() {
    return {
      invalid: false,
      loaded: false
    };
  },
  created() {
    Event.findById(this.eventId, (err, response) => {
      if(!err) {
        this.$store.commit('loadEvent', response.data);
        this.loaded = true;
      } else {
        this.invalid = true;
      }
    });
  },
  methods: {
    scrollTo(element) {
      zenscroll.to(document.getElementById(element), 250);
    }
  },
};
</script>