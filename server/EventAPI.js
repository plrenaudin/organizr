const db = require('monk')('localhost/organiz')

module.exports = {
  createNew(user, cb) {
    db.get('events').insert({ admin: user }).then(cb)
  },

  findById(id, cb) {
    db.get('events').findOne({ _id: id }).then(cb)
  },

  mutateEvent(id, action, payload, cb) {
    this.eventMutations[action](id, payload, cb)
  },

  eventMutations: {
    addChecklistItem(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $addToSet: { checklist: payload.item } }
      ).then(cb)
    },

    removeChecklistItem(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $pull: { checklist: payload.item } }
      ).then(cb)
    },

    updateInfo(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $set: { info: payload.info } }
      ).then(cb)
    },

    addPlace(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $addToSet: { places: payload.place } }
      ).then(cb)
    },

    removePlace(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $pull: { places: payload.place } }
      ).then(cb)
    },

    addDate(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $addToSet: { dates: payload.date } }
      ).then(cb)
    },

    removeDate(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $pull: { dates: payload.date } }
      ).then(cb)
    },

    addTime(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'dates.date': payload.date },
        { $addToSet: { 'dates.$.times': payload.time } }
      ).then(cb)
    },

    removeTime(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'dates.date': payload.date },
        { $pull: { 'dates.$.times': payload.time } }
      ).then(cb)
    },

    addPoll(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $addToSet: { polls: payload.poll } }
      ).then(cb)
    },

    removePoll(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $pull: { polls: payload.poll } }
      ).then(cb)
    },

    addPollQuestion(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'polls.question': payload.question },
        { $addToSet: { 'polls.$.choices': payload.choice } }
      ).then(cb)
    },

    removePollQuestion(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'polls.question': payload.question },
        { $pull: { 'polls.$.choices': payload.choice } }
      ).then(cb)
    },

    addGuest(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $addToSet: { guests: { $each: payload.guest } } }
      ).then(cb)
    },

    removeGuest(id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id },
        { $pull: { guests: payload.guest } }
      ).then(cb)
    }
  }

}