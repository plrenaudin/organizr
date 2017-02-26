<template>
  <div class="login" @click="show">
    Login
  </div>
</template>
<script>
  import Auth0LockPasswordless from 'auth0-lock-passwordless'
  import Auth from '../helpers/Auth.js'
  import Utils from '../helpers/Utils.js'

  export default {
    name:'login',
    data() {
      return {
        lock: {}
      }
    },

    created() {
      this.lock = new Auth0LockPasswordless('8xeVAk3AbL9ApMTOcNg4UIPj9HKY8h10','plrenaudin.eu.auth0.com')
      const hash = this.lock.parseHash(window.location.hash)
      if(hash) {
        localStorage.setItem('profile', JSON.stringify(hash.profile))
        localStorage.setItem('id_token', hash.id_token)
        this.$router.push(this.$route.query.redirect || '/profile')
      }
    },
    methods: {
      show() {
        let options = {
          'primaryColor':'#4CAF50 ',
          'connections':['google-oauth2','facebook'],
          'authParams': { 'scope': 'openid email' }
        }
        this.lock.socialOrMagiclink(options)
      }
    }
  }
</script>