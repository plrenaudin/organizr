import Vue from 'vue'
const vm = new Vue()

const headers = () => {
  let conf = { headers: {}}
  //put headers if authenticated
  const id_token = localStorage.getItem('id_token')
  if(id_token) {
   conf.headers['Authorization'] = `Bearer ${id_token}`
  }
  return conf
}

const fireAndForget = (promise) => {
  promise.then(response => vm.$bus.$emit('server.success', response))
    .catch(err => vm.$bus.$emit('server.error', err))
}

const create = (cb) => {
  vm.$http.post('/', {}, headers())
    .then(response => cb(null, response))
    .catch(err => cb(err, null))
}

const findById = (id, cb) => {
  vm.$http.get(`/${id}`, headers())
    .then(response => cb(null, response))
    .catch(err => cb(err, null))
}

const listMyEvents = (cb) => {
  vm.$http.get(`/listMyEvents`, headers())
    .then(response => cb(null, response))
    .catch(err => cb(err, null))
}

const addChecklistItem = (id, item) => { fireAndForget(vm.$http.post(`/${id}/addChecklistItem`, { item }, headers())) }
const removeChecklistItem = (id, item) => { fireAndForget(vm.$http.post(`/${id}/removeChecklistItem`, { item }, headers())) }
const updateInfo = (id, info) => { fireAndForget(vm.$http.post(`/${id}/updateInfo`, { info }, headers())) }
const addPlace = (id, place) => { fireAndForget(vm.$http.post(`/${id}/addPlace`, { place }, headers())) }
const removePlace = (id, place) => { fireAndForget(vm.$http.post(`/${id}/removePlace`, { place }, headers())) }
const addDate = (id, date) => { fireAndForget(vm.$http.post(`/${id}/addDate`, { date }, headers())) }
const removeDate = (id, date) => { fireAndForget(vm.$http.post(`/${id}/removeDate`, { date }, headers())) }
const addTime = (id, dateTime) => { fireAndForget(vm.$http.post(`/${id}/addTime`, dateTime, headers())) }
const removeTime = (id, dateTime) => { fireAndForget(vm.$http.post(`/${id}/removeTime`, dateTime, headers())) }
const addPoll = (id, poll) => { fireAndForget(vm.$http.post(`/${id}/addPoll`, { poll }, headers())) }
const removePoll = (id, poll) => { fireAndForget(vm.$http.post(`/${id}/removePoll`, { poll }, headers())) }
const addPollQuestion = (id, choicePoll) => { fireAndForget(vm.$http.post(`/${id}/addPollQuestion`, choicePoll, headers())) }
const removePollQuestion = (id, choicePoll) => { fireAndForget(vm.$http.post(`/${id}/removePollQuestion`, choicePoll, headers())) }
const addGuest = (id, guest) => { fireAndForget(vm.$http.post(`/${id}/addGuest`, { guest }, headers())) }
const removeGuest = (id, guest) => { fireAndForget(vm.$http.post(`/${id}/removeGuest`, { guest }, headers())) }

export default {
  create,
  findById,
  addChecklistItem,
  removeChecklistItem,
  updateInfo,
  addPlace,
  removePlace,
  addDate,
  removeDate,
  addTime,
  removeTime,
  addPoll,
  addPollQuestion,
  removePoll,
  removePollQuestion,
  addGuest,
  removeGuest,
  listMyEvents
}