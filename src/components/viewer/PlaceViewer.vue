<template>
  <div class="place">
    <ul class="placeList">
      <li v-for="place,index in places">
        <div class="placeItem">
          <checkbox @click.native.prevent="checkPlace(place.name)" :id="'place' +index" :value="isChecked(place.name)"></checkbox>
          <div class="location">
            <div class="name">{{place.name}}</div>
            <div class="map" v-if="place.valid" @click="gotoMap(place.name)">
              <img :src="imageUrl + place.name +'&markers='+place.name" />
            </div>
            <div class="placePlaceholder" v-else>
              ?
            </div>
          </div>
          <em>
            {{checkCount(place.name)}}
          </em>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import Auth from '../../helpers/Auth.js'
  import Checkbox from '../Checkbox.vue'
  const API_KEY = "AIzaSyDlSpeVFymuJjOUrrIrLkBh1Xh3Mop1VrY"
  const SCRIPTURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
  export default {
    name:'place-viewer',
    components: {Checkbox},
    methods: {
      gotoMap(name) {
        window.open(this.mapUrl + name)
      },
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
      attendeesWhoSelectedPlace() { return this.$store.getters.attendeesWhoSelectedPlace },
      imageUrl() { return `https://maps.googleapis.com/maps/api/staticmap?key=${API_KEY}&size=400x170&center=` },
      mapUrl() { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=` }
    }
  }
</script>