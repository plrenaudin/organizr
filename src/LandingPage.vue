<template>
  <div class="landingPage">
    <h1>This is the landing page</h1>
    <router-link :to="'/edit/' + getRandomRoute()">{{$t('app.landingPage.createEvent')}}</router-link>
    <router-link :to="getRandomRoute()">{{$t('app.landingPage.viewEvent')}}</router-link>

  </div>
</template>
<script>
  export default {
    name: 'landingPage',
    methods: {
      getRandomRoute() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    }
  }
</script>