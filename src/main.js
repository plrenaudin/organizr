import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import t from './helpers/Translate.js'

Object.defineProperty(Vue.prototype, '$t', {
    get() {
        return this.$root.t;
    }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  data: {
    t
  }
})
