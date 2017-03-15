<template>
  <main class="landingPage">
    <div class="intro">
      <div class="header">
        <section id="title">
          <img src="./assets/logo.svg" alt="Logo" />
          <div class="titleText">
            <h1>{{$t('app.landingPage.title')}}</h1>
            <div class="subtitle">{{$t('app.landingPage.subtitle')}}</div>
          </div>
        </section>
        <section id="description">
          <p v-html="$t('app.landingPage.description')"></p>
          <login v-show="!authenticated" :label="$t('app.landingPage.getStarted')"></login>
          <div v-show="authenticated">
            <router-link to="/profile" class="button"><i class="fa fa-arrow-right"></i> {{$t('app.landingPage.getStarted')}}</router-link>
            <div class="button" @click="logout()"><i class="fa fa-sign-out"></i>{{$t('app.logout')}}</div>
          </div>
        </section>
      </div>
    </div>
    <section class="getStartedPlease" v-if="getStartedToContinue" v-html="$t('app.landingPage.getStatedToContinue')">
    </section>
    <div class="description" v-else>
      <section id="time">
        <h3><i class="fa fa-calendar"></i> {{$t('app.landingPage.timeTitle')}}</h3>
        <p v-html="$t('app.landingPage.time')"></p>
        <img src="./assets/img/calendar.jpg" alt="Calendar" class="card" />
      </section>
      <section id="place">
        <h3><i class="fa fa-map-marker"></i> {{$t('app.landingPage.placeTitle')}}</h3>
        <p v-html="$t('app.landingPage.place')"></p>
        <img src="./assets/img/location.jpg" alt="Location" class="card" />
      </section>
      <section id="checklist">
        <h3><i class="fa fa-list"></i> {{$t('app.landingPage.checklistTitle')}}</h3>
        <p v-html="$t('app.landingPage.checklist')"></p>
        <img src="./assets/img/checklist.jpg" alt="Checklist" class="card" />
      </section>
      <section id="polls">
        <h3><i class="fa fa-bullhorn"></i> {{$t('app.landingPage.pollsTitle')}}</h3>
        <p v-html="$t('app.landingPage.polls')"></p>
        <img src="./assets/img/polls.jpg" alt="Polls" class="card" />
      </section>
    </div>
  </main>
</template>
<script>
  import Login from './components/Login.vue'
  import Auth from './helpers/Auth.js'
  export default {
    name: 'landing-page',
    components: { Login },
    data() {
      return {
        user: 'admin',
        authenticated: Auth.isAuthenticated(),
        getStartedToContinue: false
      }
    },
    methods: {
      logout() {
        Auth.logout()
        document.location.reload()
      }
    },
    created() {
      this.getStartedToContinue = this.$route.query && this.$route.query.redirect
    }
  }
</script>