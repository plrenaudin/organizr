<template>
  <div class="place">
    <div class="placeInput">
      <input type="text" id="autocomplete"/>
    </div>
    <ul class="placeList">
      <li v-for="place,index in places">
        <i class="fa fa-trash action" @click="removePlace(index)"></i>
        <div class="placeItem">
          <div class="name">{{place.name}}</div>
          <div class="map" v-if="place.valid">
            <iframe frameborder="0" style="border:0"
              :src="iframeUrl + place.name"
              allowfullscreen></iframe>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  const API_KEY = "AIzaSyDlSpeVFymuJjOUrrIrLkBh1Xh3Mop1VrY"
  const SCRIPTURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
  export default {
    name:'place',
    data() {
      return {
        autocomplete: '',
        iframeUrl: `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=`
      }
    },
    created() {
      var el = document.createElement('script')
      el.setAttribute('type', 'text/javascript')
      el.setAttribute('src', SCRIPTURL)
      document.getElementsByTagName('head')[0].appendChild(el)
    },
    mounted() {
      this.initPlace()
    },
    methods: {
      initPlace() {
        var me = this
        if(typeof google === 'undefined') {
          setTimeout(me.initPlace,200)
        } else {
          me.autocomplete = new google.maps.places.Autocomplete(me.$el.querySelector('#autocomplete'))
          me.autocomplete.addListener('place_changed',  me.selectPlace)
        }
      },
      selectPlace(event) {
        let place = this.autocomplete.getPlace()
        let placeName = place.formatted_address ? place.formatted_address : place.name
        if(place && !this.places.find(item => item.name === placeName)) {
          this.$store.commit('selectPlace', {name: placeName, valid: place.formatted_address})
        }
      },
      removePlace(index) {
        this.$store.commit('removePlace', index)
      }
    },
    computed: {
      places() { return this.$store.getters.places }
    }
  }
</script>