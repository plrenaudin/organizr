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

export default {
  create,
  findById,
  addChecklistItem,
  removeChecklistItem
}