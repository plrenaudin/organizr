<template>
  <div class="splash">
    <i class="fa fa-2x fa-exclamation-circle"></i>
    <span>{{$t('app.notfound.title')}}</span>
    <div class="button" @click="$router.push('/profile')"><i class="fa fa-plus spaced"></i>{{$t('app.notfound.create')}}</div>
  </div>
</template>
<script>
  export default {
    name: 'event-not-found'
  }
</script>