<template>
  <div class="guests">
    <input type="text" :placeholder="$t('app.guests.input')" @keyup.enter="addGuests" />
    <ul>
     <li v-for="guest,index in guests">
       <i class="fa fa-trash action" @click="removeGuests(index)"></i>
       {{guest}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'guests',
    methods: {
      addGuests(event) {
        let list = event.target.value
        if(list) {
          list = list.split(/,|\ |\n/).filter(item => item.trim())
          this.$store.commit('addGuest', list)
          event.target.value = ''
        }
      },
      removeGuests(index) {
        this.$store.commit('removeGuest', index)
      }
    },
    computed: {
      guests() {
        return this.$store.getters.guests
      }
    }
  }
</script>