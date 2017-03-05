<template>
  <main class="landingPage">
    <div class="intro">
      <section id="title">
        <h1>{{$t('app.landingPage.title')}}</h1>
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
        authenticated: Auth.isAuthenticated()
      }
    },
    methods: {
      logout() {
        Auth.logout()
        document.location.reload()
      }
    }
  }
</script>