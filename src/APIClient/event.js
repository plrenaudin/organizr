import Vue from 'vue'
const vm = new Vue();

const fireAndForget = (promise) => {
  promise.then(response => vm.$bus.$emit('server.success', response))
    .catch(err => vm.$bus.$emit('server.error', err))
}

const create = (user, cb) => {
  vm.$http.post('/', { user })
    .then(response => cb(null, response))
    .catch(err => cb(err, null))
}

const findById = (id, cb) => {
  vm.$http.get(`/${id}`)
    .then(response => cb(null, response))
    .catch(err => cb(err, null))
}

const addChecklistItem = (id, item) => { fireAndForget(vm.$http.put(`/${id}/addChecklistItem`, { item })) }
const removeChecklistItem = (id, item) => { fireAndForget(vm.$http.put(`/${id}/removeChecklistItem`, { item })) }
const updateInfo = (id, info) => { fireAndForget(vm.$http.put(`/${id}/updateInfo`, { info })) }
const addPlace = (id, place) => { fireAndForget(vm.$http.put(`/${id}/addPlace`, { place })) }
const removePlace = (id, place) => { fireAndForget(vm.$http.put(`/${id}/removePlace`, { place })) }
const addDate = (id, date) => { fireAndForget(vm.$http.put(`/${id}/addDate`, { date })) }
const removeDate = (id, date) => { fireAndForget(vm.$http.put(`/${id}/removeDate`, { date })) }
const addTime = (id, dateTime) => { fireAndForget(vm.$http.put(`/${id}/addTime`, dateTime)) }
const removeTime = (id, dateTime) => { fireAndForget(vm.$http.put(`/${id}/removeTime`, dateTime)) }
const addPoll = (id, poll) => { fireAndForget(vm.$http.put(`/${id}/addPoll`, { poll })) }
const removePoll = (id, poll) => { fireAndForget(vm.$http.put(`/${id}/removePoll`, { poll })) }
const addPollQuestion = (id, choicePoll) => { fireAndForget(vm.$http.put(`/${id}/addPollQuestion`, choicePoll)) }
const removePollQuestion = (id, choicePoll) => { fireAndForget(vm.$http.put(`/${id}/removePollQuestion`, choicePoll)) }

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
  removePollQuestion
}