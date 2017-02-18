<template>
  <div class="participants">
    <textarea :placeholder="$t('app.participants.input')" @keyup.enter="updateList" @blur="updateList">{{this.$store.getters.participants.join('\n')}}</textarea>
    <ul>
      <li v-for="participant in participants">{{participant}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'participants',
    methods: {
      updateList(event) {
        let list = event.target.value
        if(list) {
          list = list.split(/,|\ |\n/).filter(item => item.trim())
        } else {
          list = []
        }
        this.$store.commit('updateParticipants', list)
      }
    },
    computed: {
      participants() {
        return this.$store.getters.participants
      }
    }
  }
</script>