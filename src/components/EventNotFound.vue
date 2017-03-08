<template>
  <div class="notfound">
    <h1>{{$t('app.notfound.title')}}</h1>
    <div class="button" @click="$router.push('/profile')"><i class="fa fa-plus spaced"></i>{{$t('app.notfound.create')}}</div>
  </div>
</template>