<template>
  <div class="poll">
    <ul>
      <li v-for="poll, indexPoll in polls">
        {{poll.question}}
        <ul>
          <li v-for="choice,indexChoice in poll.choices">
            {{choice.name}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'poll-viewer',
    computed: {
      polls() { return this.$store.getters.polls }
    }
  }
</script>