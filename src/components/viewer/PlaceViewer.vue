<template>
  <div class="place">
    <ul class="placeList card-group">
      <li v-for="(place,index) in places">
        <section class="card full-width">
          <location :place="place"/>
          <div class="flex center space-between">
            <checkbox
              @click.native.prevent="checkPlace(place.name)"
              :id="'place' +index"
              :value="isChecked(place.name)"
              :label="$t('app.place.select')"/>
            <attendees :list="attendeesByPlace(place.name)"/>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import Auth from '../../helpers/Auth.js';
import Checkbox from '../Checkbox.vue';
import Location from '../Location.vue';
import Attendees from '../Attendees.vue';

export default {
  name:'PlaceViewer',
  components: {Checkbox, Attendees, Location},

  computed: {
    places() { return this.$store.getters.places; },
    attendeesWhoSelectedPlace() { return this.$store.getters.attendeesWhoSelectedPlace; }
  },
  methods: {
    attendeesByPlace(place) {
      return this.attendeesWhoSelectedPlace.filter(attendee => attendee.places.indexOf(place) > -1) || [];
    },
    isChecked(place) {
      return this.attendeesByPlace(place).some(a => a.email === Auth.user());
    },
    checkCount(place) {
      return this.attendeesByPlace(place).length;
    },
    checkPlace(place) {
      this.$store.commit('togglePlace', place);
    }
  },
};
</script>