<template>
  <div class="viewer">
    <side-bar @scrollto="scrollTo" :view="true" :eventId="eventId"></side-bar>
    <main>
      <section id="info" v-if="info.title || info.description">
        <h2>{{$t('app.menu.info')}}</h2>
      </section>
      <section id="calendar" v-if="dates.length > 0">
        <h2>{{$t('app.menu.datetime')}}</h2>
      </section>
      <section id="place" v-if="places.length > 0">
        <h2>{{$t('app.menu.location')}}</h2>
      </section>
      <section id="checklist" v-if="checklist.length > 0">
        <h2>{{$t('app.menu.checklist')}}</h2>
      </section>
      <section id="poll" v-if="polls.length > 0">
        <h2>{{$t('app.menu.polls')}}</h2>
      </section>
      <section id="participant" v-if="participants.length > 0">
        <h2>{{$t('app.menu.participants')}}</h2>
      </section>
    </main>

  </div>
</template>
<script>
  import zenscroll from 'zenscroll'
  import SideBar from './components/SideBar.vue'

  export default {
    name: 'viewer',
    props: ['eventId'],
    components: {SideBar},
    methods: {
      scrollTo(element) {
        zenscroll.to(document.getElementById(element), 250)
      }
    },
    created() {
      let event = {"event":{"info":{"title":"my info","description":"my desc"},"dates":[{"date":"2017-02-14","times":["15:00"]},{"date":"2017-02-15","times":["16:00"]},{"date":"2017-02-16","times":["18:00"]}],"places":[{"name":"Versailles, France","valid":"Versailles, France"}],"checklist":[{"name":"my checklist"},{"name":"myitems"}],"polls":[{"question":"question1","choices":[{"name":"choice11"},{"name":"choice12"}]},{"question":"question2","choices":[{"name":"choice21"},{"name":"choice22"}]}],"participants":["participant","1","participant2"]}};
      this.$store.commit('loadEvent', event)
    },
    computed: {
      info() { return this.$store.getters.info },
      dates() { return this.$store.getters.dates },
      places() { return this.$store.getters.places },
      checklist() { return this.$store.getters.checklist },
      polls() { return this.$store.getters.polls },
      participants() { return this.$store.getters.participants },
    }
  }
</script>