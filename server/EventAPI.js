const db = require('monk')('localhost/organiz')

module.exports = {
  createNew(user, cb) {
    db.get('events').insert({admin: user}).then(cb)
  },

  findById(id, cb) {
    db.get('events').findOne({ _id: id }).then(cb)
  },

  mutateEvent(id, action, payload, cb) {
    this[action](id, payload, cb)
  },

  addChecklistItem(id, payload, cb) {
    db.get('events').findOneAndUpdate(
      { _id: id },
      { $push: { checklist: payload.item } }
      ).then(cb)
  },
  removeChecklistItem(id, payload, cb) {
    db.get('events').findOneAndUpdate(
      { _id: id },
      { $pull: { checklist: payload.item } }
      ).then(cb)
  }

}