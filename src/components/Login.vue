<template>
  <div class="login" @click="show">
    Login
  </div>
</template>
<script>
  import Auth0Lock from 'auth0-lock'
  import Auth from '../helpers/Auth.js'
  export default {
    name:'login',
    data() {
      return {
        lock: {}
      }
    },

    created() {
      this.lock = new Auth0Lock(
        '8xeVAk3AbL9ApMTOcNg4UIPj9HKY8h10',
        'plrenaudin.eu.auth0.com', {
          auth: {
            params: {
              scope: 'openid email'
            }
          }
        }
      )
      this.lock.on('authenticated', (authResult) => {

        localStorage.setItem('id_token', authResult.idToken)
        this.lock.getProfile(authResult.idToken, (error, profile) => {

          if (error) {
            console.error(error)
            return
          }
          localStorage.setItem('profile', JSON.stringify(profile))
          this.$router.push(this.$route.query.redirect || '/profile')
        })
      })

      this.lock.on('authorization_error', (error) => {
        console.error(error)
      })
    },
    methods: {
      show() {
        this.lock.show()
      }
    }
  }
</script>