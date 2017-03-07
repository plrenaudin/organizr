<template>
  <div class="place">
    <ul class="placeList card-group">
      <li v-for="place,index in places">
        <section class="card full-width">
            <location :place="place"></location>
            <checkbox @click.native.prevent="checkPlace(place.name)" :id="'place' +index" :value="isChecked(place.name)" :label="$t('app.place.select')"></checkbox>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
  import Auth from '../../helpers/Auth.js'
  import Checkbox from '../Checkbox.vue'
  import Location from '../Location.vue'
  const API_KEY = "AIzaSyDlSpeVFymuJjOUrrIrLkBh1Xh3Mop1VrY"
  const SCRIPTURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
  export default {
    name:'place-viewer',
    components: {Checkbox, Location},
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