<template>
  <main class="landingPage">
    <div v-if="!showLoading">
      <div class="intro">
        <div class="header">
          <section id="title">
            <div>
              <img 
                src="./assets/logo.svg" 
                alt="Logo" >
              <div class="titleText inline">
                <h1>{{ $t('app.landingPage.title') }}</h1>
                <div class="subtitle">{{ $t('app.landingPage.subtitle') }}</div>
              </div>
            </div>
            <div v-show="authenticated">
              <div 
                class="button" 
                @click="logout()"><i class="fa fa-sign-out"/>{{ $t('app.logout') }}</div>
            </div>
          </section>
          <section id="description">
            <h2 v-html="$t('app.landingPage.description')"/>
            <ul class="steps">
              <li>
                <h2><i class="fa fa-magic"/>1</h2>
                <p v-html="$t('app.landingPage.step1')"/>
              </li>
              <li>
                <h2><i class="fa fa-calendar"/>2</h2>
                <p v-html="$t('app.landingPage.step2')"/>
              </li>
              <li>
                <h2><i class="fa fa-map-marker"/>3</h2>
                <p v-html="$t('app.landingPage.step3')"/>
              </li>
              <li>
                <h2><i class="fa fa-list"/>4</h2>
                <p v-html="$t('app.landingPage.step4')"/>
              </li>
              <li>
                <h2><i class="fa fa-bullhorn"/>5</h2>
                <p v-html="$t('app.landingPage.step5')"/>
              </li>
            </ul>
            <login 
              v-if="!authenticated" 
              @authenticating="showLoading = true"/>
            <router-link 
              to="/profile" 
              class="button" 
              v-else>
              <i class="fa fa-arrow-right"/> {{ $t('app.landingPage.getStartedLogged') }}
            </router-link>
            <div 
              class="scrolldown" 
              @click="scrollTo('time')">
              <div>{{ $t('app.landingPage.howto') }}</div>
              <i class="fa fa-angle-down"/>
            </div>
          </section>
        </div>
      </div>
      <div class="description">
        <section id="time">
          <div class="wording">
            <h3><i class="fa fa-calendar"/> {{ $t('app.landingPage.timeTitle') }}</h3>
            <p v-html="$t('app.landingPage.time')"/>
          </div>
          <div class="picture">
            <img 
              src="./assets/img/calendar.jpg" 
              alt="Calendar" 
              class="card" >
          </div>
        </section>
        <section id="place">
          <div class="wording">
            <h3><i class="fa fa-map-marker"/> {{ $t('app.landingPage.placeTitle') }}</h3>
            <p v-html="$t('app.landingPage.place')"/>
          </div>
          <div class="picture">
            <img 
              src="./assets/img/location.jpg" 
              alt="Location" 
              class="card" >
          </div>
        </section>
        <section id="checklist">
          <div class="wording">
            <h3><i class="fa fa-list"/> {{ $t('app.landingPage.checklistTitle') }}</h3>
            <p v-html="$t('app.landingPage.checklist')"/>
          </div>
          <div class="picture">
            <img 
              src="./assets/img/checklist.jpg" 
              alt="Checklist" 
              class="card" >
          </div>
        </section>
        <section id="polls">
          <div class="wording">
            <h3><i class="fa fa-bullhorn"/> {{ $t('app.landingPage.pollsTitle') }}</h3>
            <p v-html="$t('app.landingPage.polls')"/>
          </div>
          <div class="picture">
            <img 
              src="./assets/img/polls.jpg" 
              alt="Polls" 
              class="card" >
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <loading/>
    </div>
  </main>
</template>
<script>
import zenscroll from 'zenscroll';
import Login from './components/Login.vue';
import Loading from './components/Loading.vue';
import Auth from './helpers/Auth.js';
export default {
  name: 'LandingPage',
  components: { Login, Loading },
  data() {
    return {
      user: 'admin',
      authenticated: Auth.isAuthenticated(),
      getStartedToContinue: false,
      showLoading: false
    };
  },
  created() {
    this.getStartedToContinue = this.$route.query && this.$route.query.redirect;
  },
  methods: {
    logout() {
      Auth.logout();
      document.location.reload();
    },
    scrollTo(element) {
      zenscroll.to(document.getElementById(element), 250);
    }
  },
};
</script>