<template>
  <div class="location">
    <div class="map">
      <img
        :width="width"
        height="170"
        :src="imageUrl + place.name +'&markers='+place.name"
        v-if="place.valid"
        @click="gotoMap(place.name)">
      <div
        class="placePlaceholder"
        v-else>
        ?
      </div>
    </div>
    <div
      class="name"
      :title="place.name"><i class="fa fa-map-marker"/> {{ place.name }}</div>
  </div>
</template>
<script>
const API_KEY = 'AIzaSyCF4NJ94e0qifAS-wYU70X9f2F4zVab2QA';
export default {
  name: 'Location',
  props: ['place'],
  data() {
    return {
      width: 400
    };
  },
  computed: {
    imageUrl() {
      return `https://maps.googleapis.com/maps/api/staticmap?key=${API_KEY}&size=${this.width}x170&center=`;
    },
    mapUrl() { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=`; }
  },
  mounted() {
    this.width = this.$el.clientWidth || this.width;
  },
  methods: {
    gotoMap () {
      window.open(this.mapUrl + this.place.name);
    }
  },
};
</script>