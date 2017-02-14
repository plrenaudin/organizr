import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.css'
import t from './helpers/Translate.js'

Object.defineProperty(Vue.prototype, '$t', {
    get() {
        return this.$root.t;
    }
})

new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    t
  }
})
