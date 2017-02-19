<template>
  <div class="place">
    <ul class="placeList">
      <li v-for="place in places">
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
    name:'place-viewer',

    computed: {
      places() { return this.$store.getters.places },
      iframeUrl() { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=` }
    }
  }
</script>