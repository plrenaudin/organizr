import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import t from './helpers/Translate.js'
import axios from 'axios'

import LandingPage from './LandingPage.vue'
import Composer from './Composer.vue'
import Viewer from './Viewer.vue'

// Configure globals

Object.defineProperty(Vue.prototype, '$t', {
    get() {
        return t;
    }
})

axios.defaults.baseURL = `http://localhost:3003`
Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return axios;
    }
})

Vue.use(VueRouter)

const routes = [
  { path: '/', component: LandingPage },
  { path: '/edit/:eventId', component: Composer, props: true },
  { path: '/:eventId', component: Viewer, props: true }
]

const router = new VueRouter({
    routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
