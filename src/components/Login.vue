<template>
  <ul class="login-container">
    <li class="login button" ref="signinBtn">
      <i class="fa fa-sign-in"></i>{{$t('app.login.google')}}
    </li>
    <li>{{$t('app.login.passwordlessIntro')}}
    <li class="passwordlessInput">
      <input type="text" id="emailPasswordless" :placeholder="$t('app.login.email')" ref="emailField" @keyup.enter="sendToken" :disabled="state !== 'waiting'" />
      <div @click="sendToken" :title="$t('app.login.passwordless')">
        <i :class="['fa', {'fa-magic' : state === 'waiting'}, {'fa-spinner': state === 'sending'}, {'fa-check': state === 'sent'}]"></i>
        <span v-show="state === 'sent'" v-html="$t('app.login.sent')"></span>
      </div>
    </li>
  </ul>
</template>
<script>
import Auth from '../helpers/Auth.js'

export default {
  name: 'login',
  props: ['label'],
  data() {
    return {
      state:'waiting',
      destination: ''
    }
  },
  mounted() {
    this.destination = this.$router.currentRoute.query.redirect || '/profile'
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: __GOOGLE_CLIENT_ID__
      })
      auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
        const me = this
        const socialToken = googleUser.getAuthResponse(true).access_token
        this.$http.post('/api/auth', { network: 'google', socialToken })
          .then(token => {
            Auth.login(token.data)
            me.$router.push(this.destination)
          })
      }, error => console.log(error))
    })
  },
  methods: {
    sendToken() {
      let me = this
      const mail = me.$refs.emailField.value
      if (mail && mail.indexOf('@') > 0) {
        me.state = 'sending'
        me.$http.post('/api/sendToken', {user: mail})
          .then(data => me.state = 'sent')
          .catch(err => console.error(err))
      }
    }
  }
}
</script>