<template>
  <ul class="login-container">
    <li
      class="login button"
      ref="signinBtn">
      <i class="fa fa-sign-in"/>{{ $t('app.login.google') }}
    </li>
    <li>{{ $t('app.login.passwordlessIntro') }}
    </li><li class="passwordlessInput">
      <input
        type="text"
        id="emailPasswordless"
        :placeholder="$t('app.login.email')"
        ref="emailField"
        @keyup.enter="sendToken"
        :disabled="state !== 'waiting'" >
      <div
        @click="sendToken"
        :title="$t('app.login.passwordless')">
        <i :class="['fa', {'fa-magic' : state === 'waiting'}, {'fa-spinner': state === 'sending'}, {'fa-check': state === 'sent'}]"/>
        <span
          v-show="state === 'sent'"
          v-html="$t('app.login.sent')"/>
      </div>
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
    },
    sendToken() {
      let me = this;
      const mail = me.$refs.emailField.value;
      if (mail && mail.indexOf('@') > 0 && me.state === 'waiting') {
        me.state = 'sending';
        me.$http.post('/api/sendToken', { user: mail })
          .then(() => me.state = 'sent')
          .catch(err => console.error(err));
      }
    }
  }
};
</script>