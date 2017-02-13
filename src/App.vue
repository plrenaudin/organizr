<template>
  <div>
    <calendar v-model="eventDates"></calendar>
    <ul>
      <li v-for="date in eventDates">{{date.date}} {{date.hours}}H{{date.minutes}}</li>
    </ul>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'
export default {
  name: 'app',
  components: {Calendar},
  data () {
    return {
      eventDates:[]
    }
  }
}
</script>

<style lang="sass">
  @import './assets/scss/styles.scss';
</style>
