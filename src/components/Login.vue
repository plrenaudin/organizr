<template>
  <div class="login button" @click="loginGoogle">
    <i class="fa fa-google"></i> {{label}}
  </div>
</template>
<script>
import Auth from '../helpers/Auth.js'
import Utils from '../helpers/Utils.js'
import Hello from 'hellojs'

export default {
  name: 'login',
  props: ['label'],

  created() {
    this.init()
  },
  methods: {
    init() {
      Hello.init({
        google: __GOOGLE_CLIENT_ID__
      }, {
          scope: 'email',
          redirect_uri: '/'
        })

      Hello.on('auth.login', auth => {
        authenticate(auth.network, auth.authResponse.access_token)
      })
      const parseJwt = (token) => {
        let base64Url = token.split('.')[1]
        let base64 = base64Url.replace('-', '+').replace('_', '/')
        return window.atob(base64)
      }
      const authenticate = (network, socialToken) => {
        var me = this
        me.$http.post('/api/auth', {
          network,
          socialToken
        }).then(token => {
          localStorage.setItem('id_token',token.data)
          localStorage.setItem('profile', parseJwt(token.data))
          me.$router.push('/profile')
        })
      }
    },
    loginGoogle() {
      Hello.login('google')
    }
  }
}
</script>