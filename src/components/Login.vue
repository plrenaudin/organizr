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
      this.init()
    },
    methods: {
      init() {
        let me = this
        if(typeof Auth0LockPasswordless !== 'undefined') {
          me.lock = new Auth0LockPasswordless('IJyD4bZzNwZUVmaMrV5BlCqB8tQzAKeo','organizr.eu.auth0.com')
          const hash = me.lock.parseHash(window.location.hash)
          if(hash) {
            localStorage.setItem('profile', JSON.stringify(hash.profile))
            localStorage.setItem('id_token', hash.id_token)
            me.$router.push(me.$route.query.redirect || '/profile')
          }
        } else {
          setTimeout(me.init, 200)
        }
      },
      show() {
        let options = {
          'icon':'/logo.svg',
          'primaryColor':'#4CAF50 ',
          'dict': {
            'title': 'Organizr.io',
            'networkOrEmail': {
              'separatorText': "Or use Passwordless"
            },
          },
          'connections':['google-oauth2','facebook'],
          'authParams': { 'scope': 'openid email' }
        }
        this.lock.socialOrMagiclink(options)
      }
    }
  }
</script>