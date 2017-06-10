<template>
  <ul class="loginbuttons">
    <li class="login button" ref="signinBtn">
      <i class="fa fa-sign-in"></i> {{label}} with Google
    </li>
  </ul>
</template>
<script>
import Auth from '../helpers/Auth.js'
import Utils from '../helpers/Utils.js'


const parseJwt = token => {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace('-', '+').replace('_', '/')
  return window.atob(base64)
}

export default {
  name: 'login',
  props: ['label'],
  mounted() {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: __GOOGLE_CLIENT_ID__
      })
      auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
        const me = this
        const socialToken = googleUser.getAuthResponse(true).access_token
        this.$http.post('/api/auth', { network: 'google', socialToken })
          .then(token => {
            let data = JSON.parse(parseJwt(token.data))
            localStorage.setItem('id_token', token.data)
            localStorage.setItem('profile', JSON.stringify(data))
            me.$router.push('/profile')
          })
      }, error => console.log(error))
    })
  }
}
</script>