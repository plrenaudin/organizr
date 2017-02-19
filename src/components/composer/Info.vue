<template>
  <div class="info">
    <input type="text" v-model="model.title" :placeholder="$t('app.info.titleInput')" />
    <textarea name="desc" v-model="model.description" :placeholder="$t('app.info.descInput')" ></textarea>
  </div>
</template>
<script>
  let timeoutID = null
  let timeoutDuration = 1000 // Default timeout duration
  export default {
    name: 'info',

    data() {
      return {
        model: {
          title: '',
          description: ''
        }
      }
    },
    methods: {
      saveInfo() {
        clearTimeout(timeoutID);
        let me = this;
        timeoutID = setTimeout(function() {
          me.$store.commit('updateInfo', {title: me.model.title, description: me.model.description})
        }, timeoutDuration);
      }
    },
    watch: {
      model: {
        handler (val) { this.saveInfo() },
        deep: true
      }
    },
    mounted(){
      const {title, description} = this.$store.getters.info
      this.model.title = title
      this.model.description = description
    }
  }
</script>