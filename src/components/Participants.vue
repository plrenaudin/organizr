<template>
  <div class="participants">
    <input type="text" :placeholder="$t('app.participants.input')" @keyup.enter="addParticipants" />
    <ul>
     <li v-for="participant,index in participants">
       <i class="fa fa-trash action" @click="removeParticipants(index)"></i>
       {{participant}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'participants',
    methods: {
      addParticipants(event) {
        let list = event.target.value
        if(list) {
          list = list.split(/,|\ |\n/).filter(item => item.trim())
        }
        this.$store.commit('addParticipants', list)
        event.target.value = ''
      },
      removeParticipants(index) {
        this.$store.commit('removeParticipants', index)
      }
    },
    computed: {
      participants() {
        return this.$store.getters.participants
      }
    }
  }
</script>