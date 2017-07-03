<template>
  <div class="location">
    <div class="map">
      <img width="400" height="170"
        :src="imageUrl + place.name +'&markers='+place.name"
        v-if="place.valid"
        @click="gotoMap(place.name)"/>
      <div class="placePlaceholder" v-else>
        ?
      </div>
    </div>
    <div class="name"><i class="fa fa-map-marker"></i> {{place.name}}</div>
  </div>
</template>
<script>
  const API_KEY = "AIzaSyCpXyx4HDbN_7UDmglKe30nfWQLcu-C804"
  export default {
    name: 'location',
    props: ['place'],
    methods: {
      gotoMap (place) {
        window.open(this.mapUrl + this.place.name)
      }
    },
    computed: {
      imageUrl() { return `https://maps.googleapis.com/maps/api/staticmap?key=${API_KEY}&size=400x170&center=` },
      mapUrl() { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=` }
    }
  }
</script>