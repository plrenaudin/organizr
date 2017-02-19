<template>
  <div class="poll">
    <ul>
      <li v-for="poll, indexPoll in polls">
        <i class="fa fa-trash action" @click="removePoll(indexPoll)"></i>
        {{poll.question}}
        <ul>
          <li v-for="choice,indexChoice in poll.choices">
            <i class="fa fa-trash action" @click="removeChoice(indexPoll,indexChoice)"></i>
            {{choice.name}}
          </li>
        </ul>
        <input type="text" :placeholder="$t('app.poll.addChoice')" @keyup.enter="addChoice(indexPoll, arguments[0])" />
      </li>
    </ul>
    <input type="text" :placeholder="$t('app.poll.addItem')" @keyup.enter="addPoll" />
  </div>
</template>
<script>
  export default {
    name: 'poll',
    methods: {
      addPoll(event) {
        const itemToAdd = event.target.value
        if(itemToAdd && !this.polls.find(item => item.question === itemToAdd)) {
          this.$store.commit('addPoll', itemToAdd)
          event.target.value = ''
        }
      },
      removePoll(index) {
        this.$store.commit('removePoll', index)
      },
      addChoice(indexPoll, event){
        const choice = event.target.value
        if(choice) {
          this.$store.commit('addChoice', {indexPoll, choice})
          event.target.value = ''
        }
      },
      removeChoice(indexPoll, indexChoice) {
        this.$store.commit('removeChoice', { indexPoll, indexChoice })
      }
    },
    computed: {
      polls() { return this.$store.getters.polls }
    }
  }
</script>