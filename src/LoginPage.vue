<template>
  <div class="loginPage flex column center">
    <div
      class="card"
      v-if="!showLoading">
      <h1><i class="fa fa-user-o"/> {{ $t('app.loginPage.title') }}</h1>
      <p v-html="$t('app.loginPage.intro')"/>
      <login @authenticating="showLoading = true"/>
    </div>
    <div v-else>
      <loading/>
    </div>
  </div>
</template>
<script>
import Login from './components/Login.vue';
import Loading from './components/Loading.vue';

export default {
  name: 'LoginPage',

  components: {Login, Loading},
  data() {
    return {
      showLoading: false
    };
  },
  created() {
    const redirection = this.$route.query.redirect;
    if(redirection) {
      localStorage.setItem('redirection', redirection);
    }
  }
};
</script>