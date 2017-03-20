const db = require('monk')(process.env.MONGODB_URI)
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

  deleteEvent (id, user, cb) {
    db.get('events').findOne({ _id: id, admin: user }, (err, data) => {
      if (err || !data) {
        err && console.error(err)
        return cb(new Error('Event not found: ' + id))
      }
      db.get('archive').insert(data).then(
        db.get('events').findOneAndDelete({ _id: id, admin: user }, cb)
      )
    });
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
        { $addToSet: { checklist: payload.item } },
        cb
      )
    },

    removeChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { checklist: payload.item } },
        cb
      )
    },

    updateInfo(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $set: { info: payload.info } },
        cb
      )
    },

    addPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { places: payload.place } },
        cb
      )
    },

    removePlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { places: payload.place } },
        cb
      )
    },

    addDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { dates: payload.date } },
        cb
      )
    },

    removeDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { dates: { day: payload.date } } },
        cb
      )
    },

    addTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.day': payload.date.day },
        { $addToSet: { 'dates.$.times': payload.date.time } },
        cb
      )
    },

    removeTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.day': payload.date.day },
        { $pull: { 'dates.$.times': payload.date.time } },
        cb
      )
    },

    addPoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { polls: payload.poll } },
        cb
      )
    },

    removePoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { polls: payload.poll } },
        cb
      )
    },

    addPollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.poll.question },
        { $addToSet: { 'polls.$.choices': payload.poll.choice } },
        cb
      )
    },

    removePollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.poll.question },
        { $pull: { 'polls.$.choices': payload.poll.choice } },
        cb
      )
    },

    checkChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $addToSet: { 'attendees.$.checklist': payload.item } },
        cb
      )
    },

    uncheckChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.checklist': payload.item } },
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
        { $addToSet: { 'attendees.$.places': payload.place } },
        cb
      )
    },

    unselectPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.places': payload.place } },
        cb
      )
    },
    selectDatetime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $addToSet: { 'attendees.$.dates': payload.date } },
        cb
      )
    },

    unselectDatetime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.dates': payload.date } },
        cb
      )
    }
  }
}