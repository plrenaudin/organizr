import Vue from 'vue'
const vm = new Vue();

const create = (user, cb) => {
  vm.$http.post('/', {user})
    .then(response => cb(null, response))
    .catch (err => cb(err, null))
}

const findById = (id, cb) => {
  vm.$http.get(`/${id}`)
    .then(response => cb(null, response))
    .catch(err => cb(err, null))
}

export default {
  create,
  findById
}