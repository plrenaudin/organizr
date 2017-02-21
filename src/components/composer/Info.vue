<template>
  <div class="info">
    <input type="text" @keyup="saveInfo" :value="info.title" :placeholder="$t('app.info.titleInput')" />
    <textarea @keyup="saveInfo" :value="info.description" :placeholder="$t('app.info.descInput')" ></textarea>
  </div>
</template>
<script>
  let timeoutID = null
  let timeoutDuration = 1000 // Default timeout duration
  export default {
    name: 'info',

    methods: {
      saveInfo() {
        clearTimeout(timeoutID);
        let me = this;
        timeoutID = setTimeout(function() {
          me.$store.commit('updateInfo', {title: me.$el.querySelector('input').value, description: me.$el.querySelector('textarea').value})
        }, timeoutDuration);
      }
    },
    computed: {
      info() { return this.$store.getters.info }
    }
  }
</script>