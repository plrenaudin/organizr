import 'babel-polyfill'
import registerServiceWorker from './registerServiceWorker';
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import t from './helpers/Translate.js'
import axios from 'axios'
import Auth from './helpers/Auth.js'

import LandingPage from './LandingPage.vue'
import LoginPage from './LoginPage.vue'
import ProfilePage from './ProfilePage.vue'
import Composer from './Composer.vue'
import Viewer from './Viewer.vue'
import PageNotFound from './PageNotFound.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

const redirect = (to, from, next) => {
  const redirection = localStorage.getItem('redirection')
  if(redirection) {
    localStorage.removeItem('redirection')
    next(redirection)
  } else {
    next()
  }
}

const refreshSession = (to, from, next) => {
  const token = localStorage.getItem('profile')
  if(token) {
    if(new Date().getTime() > Number(JSON.parse(token).exp) * 1000) {
      Auth.logout()
    }
  }
  next()
}

const routes = [
  { path: '/', component: LandingPage, beforeEnter: refreshSession },
  { path: '/login', component: LoginPage, beforeEnter: refreshSession },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true }, beforeEnter: redirect},
  { path: '/edit/:eventId([a-z0-9]{24})', component: Composer, props: true, meta: { requiresAuth: true } },
  { path: '/:eventId([a-z0-9]{24})', component: Viewer, props: true, meta: { requiresAuth: true } },
  { path: '*', component: PageNotFound }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Auth.isAuthenticated()) {
      if (to.query.token) {
        Auth.login(to.query.token)
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
        return
      }
    }
  }
  next()
})

// Configure globals
axios.defaults.baseURL = __API__
axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error.response && error.response.status === 401) {
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


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

registerServiceWorker();