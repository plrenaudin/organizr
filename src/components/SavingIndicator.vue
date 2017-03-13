<template>
  <div class="savingIndicator">
    <div class="saving" v-show="saving">
      <i class="fa fa-cog fa-spin"></i>{{$t('app.saving')}}
    </div>
    <div class="saved" v-show="!saving && !error">
      <i class="fa fa-check"></i>{{$t('app.saved')}}
    </div>
    <div class="serverError" v-show="error">
      <i class="fa fa-exclamation"></i>{{$t('app.serverError')}}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'saving-indicator',
    data () {
      return {
        saving:false,
        error: false,
        call:0
      }
    },
    created() {
      this.$bus.$on('server.sent', () => this.saving = true && this.call++)
      this.$bus.$on('server.success', () => this.call-- && (this.saving = this.call !==  0))
      this.$bus.$on('server.error', () => this.error = true)
    }
  }
</script>