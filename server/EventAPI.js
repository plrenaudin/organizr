const db = require('monk')('localhost/organiz')

module.exports = {
  createNew(user, cb) {
    db.get('events').insert({ admin: user }).then(cb)
  },

  findById(id, cb) {
    db.get('events').findOne({ _id: id }).then(cb)
  }
}