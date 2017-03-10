const db = require('monk')('localhost/organiz')
module.exports = {
  createNew(user, cb) {
    db.get('events').insert({ admin: user }, cb)
  },

  findById(id, cb) {
    db.get('events').findOne({ _id: id }, cb)
  },

  participate(id, user, cb) {
    this.findById(id, (err, data) => {
      if (err || !data) {
        err && console.error(err)
        return cb(new Error('Event not found: ' + id))
      }
      if (data.attendees && data.attendees.some(item => item.email === user)) {
        cb(null, data)
      } else {
        db.get('events').findOneAndUpdate(
          { _id: id },
          { $addToSet: { attendees: { email: user } } },
          { returnNewDocument: true },
          cb
        )
      }
    })
  },

  findByUser(email, cb) {
    db.get('events').find(
      { $or:[
        { admin: email },
        { 'attendees.email': email }
      ]},
      'admin info dates attendees',
      cb)
  },

  mutateEvent(user, id, action, payload, cb) {
    this.eventMutations[action](user, id, payload, cb)
  },

  eventMutations: {
    addChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { checklist: payload } },
        cb
      )
    },

    removeChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { checklist: payload } },
        cb
      )
    },

    updateInfo(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $set: { info: payload } },
        cb
      )
    },

    addPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { places: payload } },
        cb
      )
    },

    removePlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { places: payload } },
        cb
      )
    },

    addDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { dates: payload } },
        cb
      )
    },

    removeDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { dates: { day: payload } } },
        cb
      )
    },

    addTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.day': payload.day },
        { $addToSet: { 'dates.$.times': payload.time } },
        cb
      )
    },

    removeTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.day': payload.day },
        { $pull: { 'dates.$.times': payload.time } },
        cb
      )
    },

    addPoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { polls: payload } },
        cb
      )
    },

    removePoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { polls: payload } },
        cb
      )
    },

    addPollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.question },
        { $addToSet: { 'polls.$.choices': payload.choice } },
        cb
      )
    },

    removePollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.question },
        { $pull: { 'polls.$.choices': payload.choice } },
        cb
      )
    },

    checkChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $addToSet: { 'attendees.$.checklist': payload } },
        cb
      )
    },

    uncheckChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.checklist': payload } },
        cb
      )
    },

    vote(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        {
          _id: id,
          attendees: {
            $elemMatch: {
              email: user,
              polls: {
                $not: {
                  $elemMatch: {
                    'question': payload.question
                  }
                }
              }
            }
          }
        },
        { $addToSet: { 'attendees.$.polls': { question: payload.question, choice: payload.choice } } },
        cb
      )
    },

    selectPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $addToSet: { 'attendees.$.places': payload } },
        cb
      )
    },

    unselectPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.places': payload } },
        cb
      )
    },
    selectDatetime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $addToSet: { 'attendees.$.dates': payload } },
        cb
      )
    },

    unselectDatetime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.dates': payload } },
        cb
      )
    },

  }

}