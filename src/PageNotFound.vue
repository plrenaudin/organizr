<template>
  <div class="notfound">
    <h1>{{ $t('app.notfound.title') }}</h1>
    <div 
      class="button" 
      @click="$router.push('/')"><i class="fa fa-home spaced"/>{{ $t('app.notfound.home') }}</div>
  </div>
</template>
<script>
export default {
  name: 'PageNotFound'
};
</script>