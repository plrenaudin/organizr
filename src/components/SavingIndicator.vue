<template>
  <div class="savingIndicator">
    <div 
      class="saving" 
      v-show="saving">
      <i class="fa fa-cog fa-spin"/><label>{{ $t('app.saving') }}</label>
    </div>
    <div 
      class="saved" 
      v-show="!saving && !error">
      <i class="fa fa-check"/><label>{{ $t('app.saved') }}</label>
    </div>
    <div 
      class="serverError" 
      v-show="error">
      <i class="fa fa-exclamation"/><label>{{ $t('app.serverError') }}</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SavingIndicator',
  data () {
    return {
      saving:false,
      error: false,
      call:0
    };
  },
  created() {
    this.$bus.$on('server.sent', () => {
      this.call++;
      this.saving = true;
    });
    this.$bus.$on('server.success', () => {
      this.call--;
      this.saving = this.call !==  0;
    });
    this.$bus.$on('server.error', () => {
      this.error = true;
    });
  }
};
</script>