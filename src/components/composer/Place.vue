<template>
  <div class="place">
    <div class="placeInput">
      <input
        type="text"
        id="autocomplete">
    </div>
    <ul class="placeList card-group">
      <li v-for="(place,index) in places">
        <section class="card full-width">
          <div class="placeItem">
            <location :place="place"/>
          </div>
          <div
            class="button red"
            @click="removePlace(index)">
            <i class="fa fa-trash fa-fw"/>
            {{ $t('app.remove') }}
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import Location from '../Location.vue';
const API_KEY = 'AIzaSyCF4NJ94e0qifAS-wYU70X9f2F4zVab2QA';
const SCRIPTURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
export default {
  name:'Place',
  components: {Location},
  computed: {
    places() { return this.$store.getters.places; },
    imageUrl() { return `https://maps.googleapis.com/maps/api/staticmap?key=${API_KEY}&size=400x170&center=`; },
    mapUrl() { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=`; }
  },
  created() {
    if(!window.google) {
      var el = document.createElement('script');
      el.setAttribute('type', 'text/javascript');
      el.setAttribute('src', SCRIPTURL);
      document.getElementsByTagName('head')[0].appendChild(el);
    }
  },
  mounted() {
    this.initPlace();
  },
  methods: {
    initPlace() {
      var me = this;
      if(typeof google === 'undefined') {
        setTimeout(me.initPlace,200);
      } else {
        me.autocomplete = new google.maps.places.Autocomplete(me.$el.querySelector('#autocomplete'));
        me.autocomplete.addListener('place_changed',  me.addPlace);
      }
    },
    gotoMap(name) {
      window.open(this.mapUrl + name);
    },
    addPlace() {
      let place = this.autocomplete.getPlace();
      let placeName = place.formatted_address ? place.formatted_address : place.name;
      this.$store.commit('addPlace', {name: placeName, valid: place.formatted_address});
      let inputAc = this.$el.querySelector('#autocomplete');
      inputAc.blur();
      setTimeout(() => {
        inputAc.value = '';
        inputAc.focus();
      },10);
    },
    removePlace(index) {
      this.$store.commit('removePlace', index);
    }
  },
};
</script>