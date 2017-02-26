<template>
  <div class="landingPage">
    <h1>This is the landing page</h1>
    <login v-show="!authenticated"></login>
    <div v-show="authenticated">
      <div class="button" @click="logout()">Logout</div>
    </div>
  </div>
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