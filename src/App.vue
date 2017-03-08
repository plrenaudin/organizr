<template>
  <div id="page">
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
  @import './assets/scss/styles.scss';
</style>
