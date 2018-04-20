const db = require('monk')(process.env.MONGODB_URI);
module.exports = {
  createNew(user, cb) {
    db
      .get('events')
      .insert({ admin: user })
      .then(cb);
  },

  findById(id, cb) {
    db
      .get('events')
      .findOne({ _id: id })
      .then(cb);
  },

  participate(id, user, cb) {
    this.findById(id, data => {
      if (!data) {
        console.error('Event not found: ' + id);
        return cb(new Error('Event not found: ' + id));
      }
      if (data.attendees && data.attendees.some(item => item.email === user)) {
        cb(data);
      } else {
        db
          .get('events')
          .findOneAndUpdate(
            { _id: id },
            { $addToSet: { attendees: { email: user } } },
            { returnNewDocument: true }
          )
          .then(cb);
      }
    });
  },

  deleteEvent(id, user, cb) {
    db
      .get('events')
      .findOne({ _id: id, admin: user })
      .then(data => {
        if (!data) {
          console.error('Event not found: ' + id);
          return cb(new Error('Event not found: ' + id));
        }
        db
          .get('archive')
          .insert(data)
          .then(
            db
              .get('events')
              .findOneAndDelete({ _id: id, admin: user })
              .then(cb)
          );
      });
  },

  findByUser(email, cb) {
    db
      .get('events')
      .find(
        {
          $or: [{ admin: email }, { 'attendees.email': email }]
        },
        'admin info dates attendees'
      )
      .then(cb);
  },

  mutateEvent(user, id, action, payload, cb) {
    if (payload && this.eventMutations[action]) {
      this.eventMutations[action](user, id, payload, cb);
    } else {
      cb();
    }
  },

  eventMutations: {
    addChecklistItem(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $addToSet: { checklist: payload.item } }
        )
        .then(cb);
    },

    editChecklistItem(user, id, payload, cb) {
      const update = { $set: {} };
      update['$set']['checklist.' + payload.index] = payload.value;
      db
        .get('events')
        .findOneAndUpdate({ _id: id, admin: user }, update)
        .then(cb);
    },

    removeChecklistItem(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $pull: { checklist: payload.item } }
        )
        .then(cb);
    },

    updateInfo(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $set: { info: payload.info } }
        )
        .then(cb);
    },

    addPlace(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $addToSet: { places: payload.place } }
        )
        .then(cb);
    },

    removePlace(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $pull: { places: payload.place } }
        )
        .then(cb);
    },

    addDate(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $addToSet: { dates: payload.date } }
        )
        .then(cb);
    },

    removeDate(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $pull: { dates: { day: payload.date } } }
        )
        .then(cb);
    },

    addTime(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user, 'dates.day': payload.date.day },
          { $addToSet: { 'dates.$.times': payload.date.time } }
        )
        .then(cb);
    },

    removeTime(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user, 'dates.day': payload.date.day },
          { $pull: { 'dates.$.times': payload.date.time } }
        )
        .then(cb);
    },

    addPoll(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $addToSet: { polls: payload.poll } }
        )
        .then(cb);
    },

    removePoll(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user },
          { $pull: { polls: payload.poll } }
        )
        .then(cb);
    },

    addPollChoice(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user, 'polls.question': payload.poll.question },
          { $addToSet: { 'polls.$.choices': payload.poll.choice } }
        )
        .then(cb);
    },

    removePollChoice(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, admin: user, 'polls.question': payload.poll.question },
          { $pull: { 'polls.$.choices': payload.poll.choice } }
        )
        .then(cb);
    },

    checkChecklistItem(user, id, payload, cb) {
      db
        .get('events')
        .findOne({ _id: id })
        .then(event => {
          if (event.checklist && event.checklist.includes(payload.item)) {
            db
              .get('events')
              .findOneAndUpdate(
                { _id: id, 'attendees.email': user },
                { $addToSet: { 'attendees.$.checklist': payload.item } }
              )
              .then(cb);
          } else {
            cb(null);
          }
        });
    },

    uncheckChecklistItem(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, 'attendees.email': user },
          { $pull: { 'attendees.$.checklist': payload.item } }
        )
        .then(cb);
    },

    vote(user, id, payload, cb) {
      db
        .get('events')
        .findOne({
          _id: id,
          attendees: {
            $elemMatch: {
              email: user,
              polls: {
                $not: {
                  $elemMatch: {
                    question: payload.question
                  }
                }
              }
            }
          }
        })
        .then(event => {
          //do not allow vote on unexisting question
          if (
            event &&
            event.polls &&
            event.polls.find(
              poll =>
                poll.question === payload.question &&
                poll.choices.includes(payload.choice)
            )
          ) {
            db
              .get('events')
              .findOneAndUpdate(
                { _id: id, 'attendees.email': user },
                { $addToSet: { 'attendees.$.polls': { ...payload } } }
              )
              .then(cb);
          } else {
            cb(null);
          }
        });
    },

    selectPlace(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          {
            _id: id,
            places: { $elemMatch: { name: payload.place } },
            'attendees.email': user
          },
          { $addToSet: { 'attendees.$.places': payload.place } }
        )
        .then(cb);
    },

    unselectPlace(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, 'attendees.email': user },
          { $pull: { 'attendees.$.places': payload.place } }
        )
        .then(cb);
    },

    selectDatetime(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, 'attendees.email': user },
          { $addToSet: { 'attendees.$.dates': payload.date } }
        )
        .then(cb);
    },

    unselectDatetime(user, id, payload, cb) {
      db
        .get('events')
        .findOneAndUpdate(
          { _id: id, 'attendees.email': user },
          { $pull: { 'attendees.$.dates': payload.date } }
        )
        .then(cb);
    }
  }
};
