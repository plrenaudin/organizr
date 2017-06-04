<template>
  <div class="place">
    <ul class="placeList card-group">
      <li v-for="place,index in places">
        <section class="card full-width">
            <location :place="place"></location>
            <div class="flex center space-between">
              <checkbox @click.native.prevent="checkPlace(place.name)" :id="'place' +index" :value="isChecked(place.name)" :label="$t('app.place.select')"></checkbox>
              <attendees :list="attendeesByPlace(place.name)"></attendees>
            </div>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
  import Auth from '../../helpers/Auth.js'
  import Checkbox from '../Checkbox.vue'
  import Location from '../Location.vue'
  import Attendees from '../Attendees.vue'

  export default {
    name:'place-viewer',
    components: {Checkbox, Attendees, Location},
    methods: {
      attendeesByPlace(place) {
        return this.attendeesWhoSelectedPlace.filter(attendee => attendee.places.indexOf(place) > -1) || []
      },
      isChecked(place) {
        return this.attendeesByPlace(place).some(a => a.email === Auth.user())
      },
      checkCount(place) {
        return this.attendeesByPlace(place).length
      },
      checkPlace(place) {
        this.$store.commit('togglePlace', place)
      }
    },

    computed: {
      places() { return this.$store.getters.places },
      attendeesWhoSelectedPlace() { return this.$store.getters.attendeesWhoSelectedPlace }
    }
  }
</script>