<template>
  <div class="poll">
    <ul class="card-group vertical">
      <li v-for="(poll, indexPoll) in polls">
        <section class="card">
          <div class="flex center">
            <i
              class="fa fa-trash action"
              @click="removePoll(indexPoll)"/>

            <content-editable @change="editPoll(indexPoll)" :value="poll.question"></content-editable>
          </div>
          <ul>
            <li v-for="(choice,indexChoice) in poll.choices" class="flex center">
              <i
                class="fa fa-trash action"
                @click="removeChoice(indexPoll,indexChoice)"/>
              <content-editable @change="editChoice(indexPoll,indexChoice)" :value="choice"></content-editable>
            </li>
          </ul>
          <input
            type="text"
            :placeholder="$t('app.poll.addChoice')"
            @keyup.enter="addChoice(indexPoll, arguments[0])" >
        </section>
      </li>
    </ul>
    <input
      type="text"
      :placeholder="$t('app.poll.addItem')"
      @keyup.enter="addPoll" >
  </div>
</template>
<script>
import ContentEditable from "./ContentEditable.vue"

export default {
  name: 'Poll',
  components: {ContentEditable},
  computed: {
    polls() { return this.$store.getters.polls; }
  },
  methods: {
    addPoll(event) {
      const itemToAdd = event.target.value;
      if(itemToAdd && !this.polls.find(item => item.question === itemToAdd)) {
        this.$store.commit('addPoll', itemToAdd);
        event.target.value = '';
      }
    },
    editPoll(index) {
      const value = event.target.value;
      this.$store.commit('editPoll', {index,value});
    },
    removePoll(index) {
      this.$store.commit('removePoll', index);
    },
    addChoice(indexPoll, event){
      const choice = event.target.value;
      if(choice) {
        this.$store.commit('addChoice', {indexPoll, choice});
        event.target.value = '';
      }
    },
    editChoice(indexPoll,indexChoice) {
      console.log("init",indexPoll, indexChoice,event.target.value);
      const value = event.target.value;
      this.$store.commit('editPollChoice', {indexPoll,indexChoice,value});
    },
    removeChoice(indexPoll, indexChoice) {
      this.$store.commit('removeChoice', { indexPoll, indexChoice });
    }
  },
};
</script>