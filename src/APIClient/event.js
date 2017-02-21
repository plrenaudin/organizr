import Vue from 'vue'
const vm = new Vue();

const create = (user, cb) => {
  vm.$http.post('/', {user})
    .then(response => cb(response))
    .catch (error => console.error(error))
}

const findById = (id, cb) => {
  vm.$http.get('/' + id)
    .then(response => cb(response))
    .catch(err => console.error(err))
}

export default {
  create,
  findById
}