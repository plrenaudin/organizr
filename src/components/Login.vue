<template>
  <ul class="loginbuttons">
    <li v-for="provider in providers" class="login button" @click="login(provider)">
      <i class="fa fa-sign-in"></i> {{label}} with {{provider}}
    </li>
  </ul>
</template>
<script>
import Auth from '../helpers/Auth.js'
import Utils from '../helpers/Utils.js'
import Hello from 'hellojs'

const parseJwt = token => {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace('-', '+').replace('_', '/')
  return window.atob(base64)
}

export default {
  name: 'login',
  props: ['label'],

  data() {
    return {
      providers: ['google', 'facebook']
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      Hello.init({
        google: __GOOGLE_CLIENT_ID__,
        facebook: __FACEBOOK_CLIENT_ID__
      }, { scope: 'email'
      })
      Hello.on('auth.login', auth => authenticate(auth.network, auth.authResponse.access_token))
      const authenticate = (network, socialToken) => {
        var me = this
        me.$http.post('/api/auth', { network, socialToken })
          .then(token => {
            let data = JSON.parse(parseJwt(token.data))
            data.network = network
            localStorage.setItem('id_token', token.data)
            localStorage.setItem('profile', JSON.stringify(data))
            me.$router.push('/profile')
          })
      }
    },
    login(provider) {
      Hello.login(provider).then(console.log.bind(console),console.error.bind(console))
    }
  }
}
</script>