<template>
  <div class="login button" @click="show">
    {{label}}
  </div>
</template>
<script>
  import Auth from '../helpers/Auth.js'
  import Utils from '../helpers/Utils.js'

  export default {
    name:'login',
    props: ['label'],
    data() {
      return {
        lock: {}
      }
    },

    created() {
      this.lock = new Auth0LockPasswordless('IJyD4bZzNwZUVmaMrV5BlCqB8tQzAKeo','organizr.eu.auth0.com')
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