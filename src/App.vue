<template>
  <div>
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'
export default {
  name: 'app',
  components: {Calendar},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass">
  @import './assets/scss/styles.scss';
</style>
