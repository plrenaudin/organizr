<template>
  <div class="poll">
    <ul class="question card-group">
      <li v-for="(poll, indexPoll) in polls">
        <section class="card">
          <strong>{{ poll.question }}</strong>
          <template v-if="poll.choices && poll.choices.length > 0">
            <ul class="choice">
              <li v-for="(choice, indexChoice) in poll.choices">
                <div>
                  <label
                    class="radio"
                    v-show="!hasVoted(poll.question)">
                    <input
                      type="radio"
                      v-model="selected[indexPoll]"
                      :name="indexPoll"
                      :value="choice"
                      :id="indexPoll + '-' + indexChoice"
                      class="spaced"
                      v-if="!hasVoted(poll.question)">
                    <span class="outer"><span class="inner"/></span>
                    {{ choice }}
                  </label>
                  <checkbox
                    :id="indexPoll + '-' + indexChoice"
                    :value="hasVotedFor(poll.question, choice)"
                    :disabled="true"
                    v-if="hasVoted(poll.question)"
                    :label="choice"/>
                </div>
                <attendees
                  :list="whoVotedFor(poll.question, choice)"
                  v-if="hasVoted(poll.question)"/>
              </li>
              <li v-show="!hasVoted(poll.question)"><div
                class="button"
                @click="vote(indexPoll)">{{ $t('app.poll.vote') }}</div></li>
            </ul>
          </template>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import Auth from '../../helpers/Auth.js';
import Checkbox from '../Checkbox.vue';
import Attendees from '../Attendees.vue';

export default {
  name: 'PollViewer',
  components: {Checkbox, Attendees},
  data() {
    return {
      selected:{}
    };
  },
  computed: {
    polls() { return this.$store.getters.polls; },
    attendees() { return this.$store.getters.attendees; },
    attendeesWhoVoted() { return this.$store.getters.attendeesWhoVoted; }
  },
  methods: {
    vote(indexPoll) {
      if(this.selected[indexPoll]) {
        this.$store.commit('vote', {question: this.polls[indexPoll].question, choice: this.selected[indexPoll]});
      }
    },
    hasVoted(question) {
      return this.attendeesWhoVoted.filter(a => a.email === Auth.user() && a.polls.find(p => p.question === question)).length > 0;
    },
    whoVotedFor(question, choice) {
      return this.attendeesWhoVoted.filter(a => a.polls.find(p => p.question === question && p.choice === choice));
    },
    hasVotedFor(question,choice) {
      return this.whoVotedFor(question, choice).some(i => i.email === Auth.user());
    }
  },
};
</script>