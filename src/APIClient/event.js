import Vue from 'vue'
const vm = new Vue()
const fireAndForget = (promise) => {
  promise.then(response => vm.$bus.$emit('server.success', response))
    .catch(err => vm.$bus.$emit('server.error', err))
}

const headers = () => {
  let conf = { headers: {} }
  //put headers if authenticated
  const id_token = localStorage.getItem('id_token')
  if (id_token) {
    conf.headers['Authorization'] = `Bearer ${id_token}`
  }
  return conf
}

export default {
  create: (cb) => {
    vm.$http.post('/', {}, headers())
      .then(response => cb(null, response))
      .catch(err => cb(err, null))
  },

  findById: (id, cb) => {
    vm.$http.get(`/${id}`, headers())
      .then(response => cb(null, response))
      .catch(err => cb(err, null))
  },

  listMyEvents: (cb) => {
    vm.$http.get(`/listMyEvents`, headers())
      .then(response => cb(null, response))
      .catch(err => cb(err, null))
  },

  //Mutations
  addChecklistItem: (id, item) => { fireAndForget(vm.$http.post(`/${id}/addChecklistItem`, { item }, headers())) },
  removeChecklistItem: (id, item) => { fireAndForget(vm.$http.post(`/${id}/removeChecklistItem`, { item }, headers())) },
  updateInfo: (id, info) => { fireAndForget(vm.$http.post(`/${id}/updateInfo`, { info }, headers())) },
  addPlace: (id, place) => { fireAndForget(vm.$http.post(`/${id}/addPlace`, { place }, headers())) },
  removePlace: (id, place) => { fireAndForget(vm.$http.post(`/${id}/removePlace`, { place }, headers())) },
  addDate: (id, date) => { fireAndForget(vm.$http.post(`/${id}/addDate`, { date }, headers())) },
  removeDate: (id, date) => { fireAndForget(vm.$http.post(`/${id}/removeDate`, { date }, headers())) },
  addTime: (id, dateTime) => { fireAndForget(vm.$http.post(`/${id}/addTime`, dateTime, headers())) },
  removeTime: (id, dateTime) => { fireAndForget(vm.$http.post(`/${id}/removeTime`, dateTime, headers())) },
  addPoll: (id, poll) => { fireAndForget(vm.$http.post(`/${id}/addPoll`, { poll }, headers())) },
  removePoll: (id, poll) => { fireAndForget(vm.$http.post(`/${id}/removePoll`, { poll }, headers())) },
  addPollQuestion: (id, choicePoll) => { fireAndForget(vm.$http.post(`/${id}/addPollQuestion`, choicePoll, headers())) },
  removePollQuestion: (id, choicePoll) => { fireAndForget(vm.$http.post(`/${id}/removePollQuestion`, choicePoll, headers())) },
  addGuest: (id, guest) => { fireAndForget(vm.$http.post(`/${id}/addGuest`, { guest }, headers())) },
  removeGuest: (id, guest) => { fireAndForget(vm.$http.post(`/${id}/removeGuest`, { guest }, headers())) },

  //Participations
  checkChecklistItem: (id, item) => { fireAndForget(vm.$http.post(`/${id}/checkChecklistItem`, { item }, headers())) },
  uncheckChecklistItem: (id, item) => { fireAndForget(vm.$http.post(`/${id}/uncheckChecklistItem`, { item }, headers())) },
  vote: (id, {question, choice}) => { fireAndForget(vm.$http.post(`/${id}/vote`, { question, choice }, headers())) },

}