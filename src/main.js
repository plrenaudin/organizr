import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import t from './helpers/Translate.js'
import axios from 'axios'
import Auth from './helpers/Auth.js'

import LandingPage from './LandingPage.vue'
import ProfilePage from './ProfilePage.vue'
import Composer from './Composer.vue'
import Viewer from './Viewer.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
  { path: '/edit/:eventId([a-z0-9]{24})', component: Composer, props: true, meta: { requiresAuth: true } },
  { path: '/:eventId([a-z0-9]{24})', component: Viewer, props: true, meta: { requiresAuth: true } }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Auth.isAuthenticated()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Configure globals
const bus = new Vue({})
Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return bus
    }
})

Object.defineProperty(Vue.prototype, '$t', {
    get() {
        return t
    }
})

axios.defaults.baseURL = __API__
axios.interceptors.response.use((response) => {
    return response
  }, function (error) {
    if(error.response && error.response.status === 401) {
      Auth.logout()
      router.push('/')
    } else {
      return Promise.reject(error)
    }
  })
Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return axios
    }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
