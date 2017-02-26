import Vue from 'vue'
const vm = new Vue();

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
  vm.$http.post('/', headers())
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

const addChecklistItem = (id, item) => { fireAndForget(vm.$http.patch(`/${id}/addChecklistItem`, { item }, headers())) }
const removeChecklistItem = (id, item) => { fireAndForget(vm.$http.patch(`/${id}/removeChecklistItem`, { item }, headers())) }
const updateInfo = (id, info) => { fireAndForget(vm.$http.patch(`/${id}/updateInfo`, { info }, headers())) }
const addPlace = (id, place) => { fireAndForget(vm.$http.patch(`/${id}/addPlace`, { place }, headers())) }
const removePlace = (id, place) => { fireAndForget(vm.$http.patch(`/${id}/removePlace`, { place }, headers())) }
const addDate = (id, date) => { fireAndForget(vm.$http.patch(`/${id}/addDate`, { date }, headers())) }
const removeDate = (id, date) => { fireAndForget(vm.$http.patch(`/${id}/removeDate`, { date }, headers())) }
const addTime = (id, dateTime) => { fireAndForget(vm.$http.patch(`/${id}/addTime`, dateTime, headers())) }
const removeTime = (id, dateTime) => { fireAndForget(vm.$http.patch(`/${id}/removeTime`, dateTime, headers())) }
const addPoll = (id, poll) => { fireAndForget(vm.$http.patch(`/${id}/addPoll`, { poll }, headers())) }
const removePoll = (id, poll) => { fireAndForget(vm.$http.patch(`/${id}/removePoll`, { poll }, headers())) }
const addPollQuestion = (id, choicePoll) => { fireAndForget(vm.$http.patch(`/${id}/addPollQuestion`, choicePoll, headers())) }
const removePollQuestion = (id, choicePoll) => { fireAndForget(vm.$http.patch(`/${id}/removePollQuestion`, choicePoll, headers())) }
const addGuest = (id, guest) => { fireAndForget(vm.$http.patch(`/${id}/addGuest`, { guest }, headers())) }
const removeGuest = (id, guest) => { fireAndForget(vm.$http.patch(`/${id}/removeGuest`, { guest }, headers())) }

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