<template>
  <div class="login">
    <div class="lock" @click="logout" v-show="authenticated">
      Logout
    </div>
    <div class="lock" @click="login" v-show="!authenticated">
      Login
    </div>
  </div>
</template>
<script>
  import Auth0Lock from 'auth0-lock'
  import Auth from '../helpers/Auth.js'
  export default {
    name:'login',
    data() {
      return {
        authenticated: false,
        lock: new Auth0Lock('8xeVAk3AbL9ApMTOcNg4UIPj9HKY8h10', 'plrenaudin.eu.auth0.com')
      }
    },

    created() {
      this.authenticated = !!localStorage.getItem('profile')
      this.lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
        this.lock.getProfile(authResult.idToken, (error, profile) => {
          if (error) {
            console.error(error)
            return
          }
          localStorage.setItem('profile', JSON.stringify(profile))
          this.authenticated = true
          this.$router.push(this.$route.query.redirect || '/profile')
        })
      })

      this.lock.on('authorization_error', (error) => {
        console.error(error)
      })
    },
    methods: {
      login() {
        this.lock.show()
      },
      logout() {
        Auth.logout()
        this.authenticated = false
      }
    }
  }
</script>