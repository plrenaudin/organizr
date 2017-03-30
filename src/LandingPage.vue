<template>
  <main class="landingPage">
    <div class="intro">
      <div class="header">
        <section id="title">
          <div>
            <img src="./assets/logo.svg" alt="Logo" />
            <div class="titleText inline">
              <h1>{{$t('app.landingPage.title')}}</h1>
              <div class="subtitle">{{$t('app.landingPage.subtitle')}}</div>
            </div>
          </div>
          <div v-show="authenticated">
            <div class="button" @click="logout()"><i class="fa fa-sign-out"></i>{{$t('app.logout')}}</div>
          </div>
        </section>
        <section class="getStartedPlease" v-if="getStartedToContinue">
          <p v-html="$t('app.landingPage.getStatedToContinue')"></p>
          <login v-if="!authenticated" :label="$t('app.landingPage.join')"></login>
        </section>
        <section id="description" v-else>
          <h2 v-html="$t('app.landingPage.description')"></h2>
          <ul class="steps">
            <li>
              <h2><i class="fa fa-magic"></i>1</h2>
              <p v-html="$t('app.landingPage.step1')"></p>
            </li>
            <li>
              <h2><i class="fa fa-calendar"></i>2</h2>
              <p v-html="$t('app.landingPage.step2')"></p>
            </li>
            <li>
              <h2><i class="fa fa-map-marker"></i>3</h2>
              <p v-html="$t('app.landingPage.step3')"></p>
            </li>
            <li>
              <h2><i class="fa fa-list"></i>4</h2>
              <p v-html="$t('app.landingPage.step4')"></p>
            </li>
            <li>
              <h2><i class="fa fa-bullhorn"></i>5</h2>
              <p v-html="$t('app.landingPage.step5')"></p>
            </li>
          </ul>
          <login v-if="!authenticated" :label="$t('app.landingPage.getStarted')"></login>
          <router-link to="/profile" class="button" v-else>
            <i class="fa fa-arrow-right"></i> {{$t('app.landingPage.getStartedLogged')}}
          </router-link>
          <div class="scrolldown" @click="scrollTo('time')">
            <div>{{$t('app.landingPage.howto')}}</div>
            <i class="fa fa-angle-down"></i>
          </div>
        </section>
      </div>
    </div>
    <div class="description">
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
  import zenscroll from 'zenscroll'
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
      },
      scrollTo(element) {
        zenscroll.to(document.getElementById(element), 250)
      }
    },
    created() {
      this.getStartedToContinue = this.$route.query && this.$route.query.redirect
    }
  }
</script>