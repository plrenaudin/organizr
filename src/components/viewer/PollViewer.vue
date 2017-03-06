<template>
  <div class="poll">
    <ul class="question">
      <li v-for="poll, indexPoll in polls">
        <strong>{{poll.question}}</strong>
        <ul>
          <li v-for="choice, indexChoice in poll.choices">
            <input type="radio"
              v-model="selected[indexPoll]"
              :name="indexPoll"
              :value="choice"
              :id="indexPoll + '-' + indexChoice"
              class="spaced"
              v-if="!hasVoted(poll.question)"/>
            <checkbox :id="indexPoll + '-' + indexChoice" :value="true" :disabled="true" v-if="hasVotedFor(poll.question, choice)"></checkbox>
            <label :for="indexPoll + '-' + indexChoice">{{choice}}</label>
            <em v-show="hasVoted(poll.question)">{{whoVotedFor(poll.question,choice).length}}</em>
          </li>
          <li v-show="!hasVoted(poll.question)"><div class="button" @click="vote(indexPoll)">{{$t('app.poll.vote')}}</div></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  import Auth from '../../helpers/Auth.js'
  import Checkbox from '../Checkbox.vue'

  export default {
    name: 'poll-viewer',
    components: {Checkbox},
    data() {
      return {
        selected:{}
      }
    },
    methods: {
      vote(indexPoll) {
        this.$store.commit('vote', {question: this.polls[indexPoll].question, choice: this.selected[indexPoll]})
      },

      hasVoted(question) {
        return this.attendeesWhoVoted.filter(a => a.email === Auth.user() && a.polls.find(p => p.question === question)).length > 0
      },

      whoVotedFor(question, choice) {
        return this.attendeesWhoVoted.filter(a => a.polls.find(p => p.question === question && p.choice === choice))
      },
      hasVotedFor(question,choice) {
        return this.whoVotedFor(question, choice).some(i => i.email === Auth.user())
      }
    },
    computed: {
      polls() { return this.$store.getters.polls },
      attendees() { return this.$store.getters.attendees },
      attendeesWhoVoted() { return this.$store.getters.attendeesWhoVoted }
    }
  }
</script>