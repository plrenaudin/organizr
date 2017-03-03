const db = require('monk')('localhost/organiz')

module.exports = {
  createNew(user, cb) {
    db.get('events').insert({ admin: user }).then(cb).catch(err => console.error(err))
  },

  findById(id, cb) {
    db.get('events').findOne({ _id: id }).then(cb).catch(err => console.error(err))
  },

  participate(id, user, cb) {
    this.findById(id, data => {
      if(!data) { throw new Error('Event not found: ' + id)}
      if(data.attendees && data.attendees.some(item => item.email === user)) {
        cb(data)
      } else {
        db.get('events').findOneAndUpdate(
          { _id: id },
          { $addToSet: { attendees: { email: user } } },
          { returnNewDocument: true }
        ).then(cb).catch(err => console.error(err))
      }
    })
  },

  findByAdmin(email, cb) {
    db.get('events').find({ admin: email }).then(cb).catch(err => console.error(err))
  },

  mutateEvent(user, id, action, payload, cb) {
    this.eventMutations[action](user, id, payload, cb)
  },

  eventMutations: {
    addChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { checklist: payload.item } }
      ).then(cb).catch(err => console.error(err))
    },

    removeChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { checklist: payload.item } }
      ).then(cb).catch(err => console.error(err))
    },

    updateInfo(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $set: { info: payload.info } }
      ).then(cb).catch(err => console.error(err))
    },

    addPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { places: payload.place } }
      ).then(cb).catch(err => console.error(err))
    },

    removePlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { places: payload.place } }
      ).then(cb).catch(err => console.error(err))
    },

    addDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { dates: payload.date } }
      ).then(cb).catch(err => console.error(err))
    },

    removeDate(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { dates: { date: payload.date } } }
      ).then(cb).catch(err => console.error(err))
    },

    addTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.date': payload.date },
        { $addToSet: { 'dates.$.times': payload.time } }
      ).then(cb).catch(err => console.error(err))
    },

    removeTime(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'dates.date': payload.date },
        { $pull: { 'dates.$.times': payload.time } }
      ).then(cb).catch(err => console.error(err))
    },

    addPoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { polls: payload.poll } }
      ).then(cb).catch(err => console.error(err))
    },

    removePoll(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { polls: payload.poll } }
      ).then(cb).catch(err => console.error(err))
    },

    addPollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.question },
        { $addToSet: { 'polls.$.choices': payload.choice } }
      ).then(cb).catch(err => console.error(err))
    },

    removePollQuestion(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user, 'polls.question': payload.question },
        { $pull: { 'polls.$.choices': payload.choice } }
      ).then(cb).catch(err => console.error(err))
    },

    addGuest(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $addToSet: { guests: { $each: payload.guest } } }
      ).then(cb).catch(err => console.error(err))
    },

    removeGuest(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, admin: user },
        { $pull: { guests: payload.guest } }
      ).then(cb).catch(err => console.error(err))
    },

    checkChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $addToSet: { 'attendees.$.checklist': payload.item } }
      ).then(cb).catch(err => console.error(err))
    },

    uncheckChecklistItem(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.checklist': payload.item } }
      ).then(cb).catch(err => console.error(err))
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
        { $addToSet: { 'attendees.$.polls': {question: payload.question, choice: payload.choice} } }
      ).then(cb).catch(err => console.error(err))
    },

    selectPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $addToSet: { 'attendees.$.places': payload.place } }
      ).then(cb).catch(err => console.error(err))
    },

    unselectPlace(user, id, payload, cb) {
      db.get('events').findOneAndUpdate(
        { _id: id, 'attendees.email': user },
        { $pull: { 'attendees.$.places': payload.place } }
      ).then(cb).catch(err => console.error(err))
    }

  }

}