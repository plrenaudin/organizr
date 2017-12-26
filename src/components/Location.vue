<template>
  <div class="location">
    <div class="map">
      <img :width="width" height="170"
        :src="imageUrl + place.name +'&markers='+place.name"
        v-if="place.valid"
        @click="gotoMap(place.name)"/>
      <div class="placePlaceholder" v-else>
        ?
      </div>
    </div>
    <div class="name" :title="place.name"><i class="fa fa-map-marker"></i> {{place.name}}</div>
  </div>
</template>
<script>
  const API_KEY = "AIzaSyCpXyx4HDbN_7UDmglKe30nfWQLcu-C804"
  export default {
    name: 'location',
    props: ['place'],
    data() {
      return {
        width: 400
      }
    },
    methods: {
      gotoMap (place) {
        window.open(this.mapUrl + this.place.name)
      }
    },
    computed: {
      imageUrl() {
        return `https://maps.googleapis.com/maps/api/staticmap?key=${API_KEY}&size=${this.width}x170&center=`
         },
      mapUrl() { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=` }
    },
    mounted() {
      this.width = this.$el.clientWidth || this.width;
    }
  }
</script>