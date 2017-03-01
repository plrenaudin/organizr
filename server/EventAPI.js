const db = require('monk')('localhost/organiz')

module.exports = {
  createNew(user, cb) {
    db.get('events').insert({ admin: user }).then(cb)
  },

  findById(id, cb) {
    db.get('events').findOne({ _id: id }).then(cb)
  },

  participate(id, user, cb) {
    this.findById(id, data => {
      if(data.attendees && data.attendees.some(item => item.email === user)) {
        cb(data)
      } else {
        db.get('events').findOneAndUpdate(
          { _id: id },
          { $addToSet: { attendees: { email: user } } },
          { returnNewDocument: true }
        ).then(cb)
      }
    })
  },

  findByAdmin(email, cb) {
    db.get('events').find({ admin: email }).then(cb)
  },

  mutateEvent(user, id, action, payload, cb) {
    this.eventMutations[action](user, id, payload, cb)
  },

  eventMutations: {
    addChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { checklist: payload.item } }
      ).then(cb)
    },

    removeChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { checklist: payload.item } }
      ).then(cb)
    },

    updateInfo(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $set: { info: payload.info } }
      ).then(cb)
    },

    addPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { places: payload.place } }
      ).then(cb)
    },

    removePlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { places: payload.place } }
      ).then(cb)
    },

    addDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { dates: payload.date } }
      ).then(cb)
    },

    removeDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { dates: { date: payload.date } } }
      ).then(cb)
    },

    addTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.date': payload.date },
        { $addToSet: { 'dates.$.times': payload.time } }
      ).then(cb)
    },

    removeTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.date': payload.date },
        { $pull: { 'dates.$.times': payload.time } }
      ).then(cb)
    },

    addPoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { polls: payload.poll } }
      ).then(cb)
    },

    removePoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { polls: payload.poll } }
      ).then(cb)
    },

    addPollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.question },
        { $addToSet: { 'polls.$.choices': payload.choice } }
      ).then(cb)
    },

    removePollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.question },
        { $pull: { 'polls.$.choices': payload.choice } }
      ).then(cb)
    },

    addGuest(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { guests: { $each: payload.guest } } }
      ).then(cb)
    },

    removeGuest(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { guests: payload.guest } }
      ).then(cb)
    }
  }

}