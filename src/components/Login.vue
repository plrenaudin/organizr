<template>
  <ul class="login-container">
    <li
      class="login button"
      ref="signinBtn">
      <i class="fa fa-sign-in"/>{{ $t('app.login.google') }}
    </li>
  </ul>
</template>
<script>
import Auth from '../helpers/Auth.js';

export default {
  name: 'Login',
  props: ['label'],
  data() {
    return {
      state: 'waiting'
    };
  },
  mounted() {
    this.onMounted();
  },
  methods: {
    authentify(googleUser) {
      this.$emit('authenticating');
      const me = this;
      const socialToken = googleUser.getAuthResponse(true).access_token;
      this.$http.post('/api/auth', { network: 'google', socialToken })
        .then(token => {
          Auth.login(token.data);
          me.$router.push('/profile');
        });
    },
    onMounted() {
      if (!window.gapi) {
        console.log('Defer Loading Auth...');
        setTimeout(this.onMounted, 250);
      } else {
        console.log('Loading Auth...');
        this.loadGoogleAuth();
      }
    },
    loadGoogleAuth() {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: __GOOGLE_CLIENT_ID__
        });
        auth2.attachClickHandler(this.$refs.signinBtn, {}, this.authentify, error => console.log(error));
      });
    }
  }
};
</script>