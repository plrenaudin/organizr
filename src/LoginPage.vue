<template>
  <div class="loginPage flex column center">
    <div class="card">
      <h1><i class="fa fa-user-o"></i> {{$t('app.loginPage.title')}}</h1>
      <p v-html="$t('app.loginPage.intro')"></p>
      <login></login>
    </div>
  </div>
</template>
<script>
  import Event from './APIClient/event.js'
  import Auth from './helpers/Auth.js'
  import Login from './components/Login.vue'
  export default {
    name: 'login-page',

    components: {Login},

    created() {
      const redirection = this.$route.query.redirect
      if(redirection) {
        localStorage.setItem('redirection', redirection)
      }
    }
  }
</script>