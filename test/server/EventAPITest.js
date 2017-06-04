const secret = require('../../server/.env')
const db = require('monk')(secret.MONGODB_URI)
const expect = require('chai').expect
const sut = require('../../server/EventAPI.js')
const data = require('./fixtures.js')

describe('EventAPI test suite', () => {
  before((done) => {
    db.get('archive').drop(() => {
      db.get('events').drop(() => {
        db.get('events').insert(data, () => { done() })
      })
    })
  })

  it('finds the user event list', (done) => {
    const result = sut.findByUser('testuser', (err, data) => {
      expect(err).to.be.null
      expect(data.length).to.equal(3)
      done()
    })
  })

  it('inserts a new event and set the admin', (done) => {
    sut.createNew('newUser', () => {
      sut.findByUser('newUser', (err, data) => {
        expect(err).to.be.null
        expect(data.length).to.equal(1)
        expect(data[0].admin).to.equal('newUser')
        done()
      })
    })
  })

  it('finds by id newly created events', (done) => {
    sut.createNew('newUser', (err, data) => {
      sut.findById(data._id, (err2, data2) => {
        expect(err2).to.be.null
        expect(data2._id.equals(data._id)).to.be.true
        done()
      })
    })
  })

  it('finds by id other events', (done) => {
    sut.findById("58c56a83ad49880001fc1a0c", (err, data) => {
      expect(err).to.be.null
      expect(data.info.title).to.equal('plop')
      done()
    })
  })

  it('adds a new participation', (done) => {
    sut.participate('58c56a83ad49880001fc1a0c', 'new attendee', (err, data) => {
      expect(err).to.be.null
      expect(data.attendees.length).to.equal(2)
      done()
    })
  })

  it('throws an error if the event does not exist and someone tries to participate', (done) => {
    sut.participate('cccccccccccccccccccccccc', 'anotherAttendee', (err, data) => {
      expect(err.message).to.equal('Event not found: cccccccccccccccccccccccc')
      done()
    })
  })

  it('does not add a new participation if already there', (done) => {
    sut.participate('58c56a83ad49880001fc1a0c', 'testuser', (err, data) => {
      expect(err).to.be.null
      expect(data.attendees.length).to.equal(2)
      done()
    })
  })

  it('deletes the event', (done) => {
    sut.findById("58c56a83ad49880001fc1a0c", (err, data) => {
      expect(err).to.be.null
      expect(data).not.to.be.null
      sut.deleteEvent('58c56a83ad49880001fc1a0c', 'testuser', () => {
        sut.findById("58c56a83ad49880001fc1a0c", (err2, data2) => {
          expect(err2).to.be.null
          expect(data2).to.be.null
          done()
        })
      })
    })
  })

  it('throws an error if the event does not exist and someone tries to delete it', (done) => {
    sut.deleteEvent('cccccccccccccccccccccccc', 'someguy', (err, data) => {
      expect(err.message).to.equal('Event not found: cccccccccccccccccccccccc')
      done()
    })
  })

  // Add checklist item

  it('adds a checklist item also create the checklist list', (done) => {
    sut.eventMutations.addChecklistItem('testuser', '58c567be9d4bf30001eb100f', { item: 'newitem' }, (err, data) => {
      expect(err).to.be.null
      expect(data.checklist.length).to.equal(1)
      expect(data.checklist[0]).to.equal('newitem')
      done()
    })
  })

  it('uses the mutation nested object and adds a checklist item to existing checklist list',(done) => {
    sut.mutateEvent('testuser','58c567be9d4bf30001eb100f','addChecklistItem',{ item: 'newitem2' }, (err, data) => {
      expect(err).to.be.null
      expect(data.checklist.length).to.equal(2)
      expect(data.checklist[0]).to.equal('newitem')
      expect(data.checklist[1]).to.equal('newitem2')
      done()
    })
  })

  it('adds a checklist item only if not exist already', (done) => {
    sut.eventMutations.addChecklistItem('testuser', '58c567be9d4bf30001eb100f', { item: 'newitem' }, (err, data) => {
      expect(err).to.be.null
      expect(data.checklist.length).to.equal(2)
      done()
    })
  })

  it('does not add a checklist item if not the admin', (done) => {
    sut.eventMutations.addChecklistItem('anotherUser', '58c567be9d4bf30001eb100f', { item: 'newitem' }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.checklist.length).to.equal(2)
        done()
      })
    })
  })

  //remove checklist item

  it('removes a checklist item', (done) => {
    sut.eventMutations.removeChecklistItem('testuser', '58c567be9d4bf30001eb100f', { item: 'newitem2' }, (err, data) => {
      expect(err).to.be.null
      expect(data.checklist.length).to.equal(1)
      expect(data.checklist[0]).to.equal('newitem')
      done()
    })
  })

  it('does not remove a checklist item if not admin', (done) => {
    sut.eventMutations.removeChecklistItem('another', '58c567be9d4bf30001eb100f', { item: 'newitem2' }, (err, data) => {
      expect(err).to.be.null
      expect(data.checklist).to.be.undefined
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.checklist.length).to.equal(1)
        done()
      })
    })
  })

  it('removes nothing if the item does not exist', (done) => {
    sut.eventMutations.removeChecklistItem('testuser', '58c567be9d4bf30001eb100f', { item: 'gaga' }, (err, data) => {
      expect(err).to.be.null
      expect(data.checklist.length).to.equal(1)
      done()
    })
  })

  //update info

  it('updates the info', (done) => {
    sut.eventMutations.updateInfo('testuser', '58c567be9d4bf30001eb100f', { info: { title: 'myTitle', description: 'myDescription' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.info.title).to.equal('myTitle')
      expect(data.info.description).to.equal('myDescription')
      done()
    })
  })

  it('generates the info if not exist', (done) => {
    sut.eventMutations.updateInfo('infouser', '58c6f6a9cdee6c0001ea4d95', { info: { title: 'myTitle', description: 'myDescription' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.info.title).to.equal('myTitle')
      expect(data.info.description).to.equal('myDescription')
      done()
    })
  })

  it('does not update info if not admin', (done) => {
    sut.eventMutations.updateInfo('another', '58c567be9d4bf30001eb100f', { info: { title: 'hacktitle', description: 'hackdesc' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      done()
    })
  })

  //add place

  it('adds a place item also create the place list', (done) => {
    sut.eventMutations.addPlace('testuser', '58c567be9d4bf30001eb100f', { place: { name: 'myPlace' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.places.length).to.equal(1)
      expect(data.places[0].name).to.equal('myPlace')
      done()
    })
  })

  it('adds a place item to existing place list', (done) => {
    sut.eventMutations.addPlace('testuser', '58c567be9d4bf30001eb100f', { place: { name: 'myPlace2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.places.length).to.equal(2)
      expect(data.places[0].name).to.equal('myPlace')
      expect(data.places[1].name).to.equal('myPlace2')
      done()
    })
  })

  it('adds a place item only if not exist already', (done) => {
    sut.eventMutations.addPlace('testuser', '58c567be9d4bf30001eb100f', { place: { name: 'myPlace' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.places.length).to.equal(2)
      done()
    })
  })

  it('does not add a place item if not the admin', (done) => {
    sut.eventMutations.addPlace('anotherUser', '58c567be9d4bf30001eb100f', { place: { name: 'gaga' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.places.length).to.equal(2)
        done()
      })
    })
  })

  // remove place

  it('removes a place', (done) => {
    sut.eventMutations.removePlace('testuser', '58c567be9d4bf30001eb100f', { place: { name: 'myPlace2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.places.length).to.equal(1)
      expect(data.places[0].name).to.equal('myPlace')
      done()
    })
  })

  it('does not remove a place if not admin', (done) => {
    sut.eventMutations.removePlace('another', '58c567be9d4bf30001eb100f', { place: { name: 'myPlace2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.places).to.be.undefined
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.places.length).to.equal(1)
        done()
      })
    })
  })

  it('removes nothing if the place does not exist', (done) => {
    sut.eventMutations.removePlace('testuser', '58c567be9d4bf30001eb100f', { place: { name: 'unexisintg' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.places.length).to.equal(1)
      done()
    })
  })

  //add date

  it('adds a date also create the date list', (done) => {
    sut.eventMutations.addDate('testuser', '58c567be9d4bf30001eb100f', { date: { day: '2017-07-25' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      expect(data.dates[0].day).to.equal('2017-07-25')
      done()
    })
  })

  it('adds a date to existing date list', (done) => {
    sut.eventMutations.addDate('testuser', '58c567be9d4bf30001eb100f', { date: { day: '2017-06-08'} }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(2)
      expect(data.dates[0].day).to.equal('2017-07-25')
      expect(data.dates[1].day).to.equal('2017-06-08')
      done()
    })
  })

  it('adds a date only if not exist already', (done) => {
    sut.eventMutations.addDate('testuser', '58c567be9d4bf30001eb100f', { date: { day: '2017-06-08' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(2)
      done()
    })
  })

  it('does not add a date if not the admin', (done) => {
    sut.eventMutations.addDate('anotherUser', '58c567be9d4bf30001eb100f', { date: { day: '2017-08-06' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.dates.length).to.equal(2)
        done()
      })
    })
  })

  // remove date

  it('removes a date', (done) => {
    sut.eventMutations.removeDate('testuser', '58c567be9d4bf30001eb100f', { date: '2017-06-08' }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      expect(data.dates[0].day).to.equal('2017-07-25')
      done()
    })
  })

  it('does not remove a date if not admin', (done) => {
    sut.eventMutations.removeDate('another', '58c567be9d4bf30001eb100f', { date: '2017-07-25' }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates).to.be.undefined
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.dates.length).to.equal(1)
        done()
      })
    })
  })

  it('removes nothing if the date does not exist', (done) => {
    sut.eventMutations.removeDate('testuser', '58c567be9d4bf30001eb100f', { date: '2017-03-03' }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      done()
    })
  })

  //add time

  it('adds a time to a day without time yet', (done) => {
    sut.eventMutations.addTime('testuser', '58c567be9d4bf30001eb100f', { date: { day: '2017-07-25', time: '15:30' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      expect(data.dates[0].times.length).to.equal(1)
      expect(data.dates[0].times[0]).to.equal('15:30')
      done()
    })
  })

  it('adds a time to a day with time', (done) => {
    sut.eventMutations.addTime('testuser', '58c567be9d4bf30001eb100f', { date: { day: '2017-07-25', time: '18:30' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      expect(data.dates[0].times.length).to.equal(2)
      expect(data.dates[0].times[0]).to.equal('15:30')
      expect(data.dates[0].times[1]).to.equal('18:30')
      done()
    })
  })

  it('adds a date only if not exist already', (done) => {
    sut.eventMutations.addTime('testuser', '58c567be9d4bf30001eb100f', { date: { day: '2017-07-25', time: '15:30' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      expect(data.dates[0].times.length).to.equal(2)
      done()
    })
  })

  it('does not add a time if not the admin', (done) => {
    sut.eventMutations.addTime('anotherUser', '58c567be9d4bf30001eb100f', { date: { day: '2017-07-25', time: '15:30' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.dates.length).to.equal(1)
        expect(data2.dates[0].times.length).to.equal(2)
        done()
      })
    })
  })

  it('does not add a time day does not exist', (done) => {
    sut.eventMutations.addTime('testuser', '58c567be9d4bf30001eb100f', { date: { day: '2017-02-02', time: '15:30' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.dates.length).to.equal(1)
        expect(data2.dates[0].times.length).to.equal(2)
        done()
      })
    })
  })

  // remove time

  it('removes a time', (done) => {
    sut.eventMutations.removeTime('testuser', '58c567be9d4bf30001eb100f', { date:{day: '2017-07-25', time:'15:30' }}, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      expect(data.dates[0].times.length).to.equal(1)
      expect(data.dates[0].times[0]).to.equal('18:30')
      done()
    })
  })

  it('does not remove a time if not admin', (done) => {
    sut.eventMutations.removeTime('another', '58c567be9d4bf30001eb100f', { date:{day: '2017-07-25', time:'18:30' }}, (err, data) => {
      expect(err).to.be.null
      expect(data.dates).to.be.undefined
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.dates.length).to.equal(1)
        expect(data2.dates[0].times.length).to.equal(1)
        expect(data2.dates[0].times[0]).to.equal('18:30')
        done()
      })
    })
  })

  it('removes nothing if the date does not exist', (done) => {
    sut.eventMutations.removeTime('testuser', '58c567be9d4bf30001eb100f', { date:{day: '2017-07-23', time:'18:30' }}, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.dates.length).to.equal(1)
        expect(data2.dates[0].times.length).to.equal(1)
        done()
      })
    })
  })

  it('removes nothing if the time does not exist', (done) => {
    sut.eventMutations.removeTime('testuser', '58c567be9d4bf30001eb100f', { date:{day: '2017-07-25', time:'22:00' }}, (err, data) => {
      expect(err).to.be.null
      expect(data.dates.length).to.equal(1)
      done()
    })
  })

  //add poll

  it('adds a poll also create the poll list', (done) => {
    sut.eventMutations.addPoll('testuser', '58c567be9d4bf30001eb100f', { poll:{ question: 'poll1' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      expect(data.polls[0].question).to.equal('poll1')
      done()
    })
  })

  it('adds a poll to existing poll list', (done) => {
    sut.eventMutations.addPoll('testuser', '58c567be9d4bf30001eb100f', { poll:{ question: 'poll2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(2)
      expect(data.polls[0].question).to.equal('poll1')
      expect(data.polls[1].question).to.equal('poll2')
      done()
    })
  })

  it('adds a poll only if not exist already', (done) => {
    sut.eventMutations.addPoll('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll1' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(2)
      done()
    })
  })

  it('does not add a poll if not the admin', (done) => {
    sut.eventMutations.addPoll('anotherUser', '58c567be9d4bf30001eb100f', { poll: { question: 'haha'} }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.polls.length).to.equal(2)
        done()
      })
    })
  })

  // remove poll

  it('removes a poll', (done) => {
    sut.eventMutations.removePoll('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll1' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      expect(data.polls[0].question).to.equal('poll2')
      done()
    })
  })

  it('does not remove a poll if not admin', (done) => {
    sut.eventMutations.removePoll('another', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2' }  }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls).to.be.undefined
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.polls.length).to.equal(1)
        done()
      })
    })
  })

  it('removes nothing if the poll does not exist', (done) => {
    sut.eventMutations.removePoll('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'hihi' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      done()
    })
  })

  //add poll choice

  it('adds a choice to a poll without choice yet', (done) => {
    sut.eventMutations.addPollChoice('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2', choice:'choice1' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      expect(data.polls[0].choices.length).to.equal(1)
      expect(data.polls[0].choices[0]).to.equal('choice1')
      done()
    })
  })

  it('adds a choice to a poll with choices', (done) => {
    sut.eventMutations.addPollChoice('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2', choice:'choice2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      expect(data.polls[0].choices.length).to.equal(2)
      expect(data.polls[0].choices[0]).to.equal('choice1')
      expect(data.polls[0].choices[1]).to.equal('choice2')
      done()
    })
  })

  it('adds a choice only if not exist already', (done) => {
    sut.eventMutations.addPollChoice('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2', choice:'choice2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      expect(data.polls[0].choices.length).to.equal(2)
      done()
    })
  })

  it('does not add a choice if not the admin', (done) => {
    sut.eventMutations.addPollChoice('anotherUser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2', choice:'choice3' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.polls.length).to.equal(1)
        expect(data2.polls[0].choices.length).to.equal(2)
        done()
      })
    })
  })

  it('does not add a choice if poll does not exist', (done) => {
    sut.eventMutations.addPollChoice('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'pollNotExisting', choice:'choice3' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.polls.length).to.equal(1)
        expect(data2.polls[0].choices.length).to.equal(2)
        done()
      })
    })
  })

  // remove poll choice

  it('removes a poll choice', (done) => {
    sut.eventMutations.removePollChoice('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2', choice:'choice2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      expect(data.polls[0].choices.length).to.equal(1)
      expect(data.polls[0].choices[0]).to.equal('choice1')
      done()
    })
  })

  it('does not remove a poll choice if not admin', (done) => {
    sut.eventMutations.removePollChoice('another', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2', choice:'choice1' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls).to.be.undefined
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.polls.length).to.equal(1)
        expect(data2.polls[0].choices.length).to.equal(1)
        expect(data2.polls[0].choices[0]).to.equal('choice1')
        done()
      })
    })
  })

  it('removes nothing if the poll does not exist', (done) => {
    sut.eventMutations.removePollChoice('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll not existing', choice:'choice2' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      db.get('events').findOne({ _id: '58c567be9d4bf30001eb100f' }).then((data2) => {
        expect(data2.polls.length).to.equal(1)
        expect(data2.polls[0].choices.length).to.equal(1)
        done()
      })
    })
  })

  it('removes nothing if the choice does not exist', (done) => {
    sut.eventMutations.removePollChoice('testuser', '58c567be9d4bf30001eb100f', { poll: { question: 'poll2', choice:'choice3' } }, (err, data) => {
      expect(err).to.be.null
      expect(data.polls.length).to.equal(1)
      expect(data.polls[0].choices.length).to.equal(1)
      done()
    })
  })

  //Participations

  //Check checklist item

  it('checks checklist items', (done) => {
    sut.eventMutations.checkChecklistItem('participant', '58c567be9d4bf30001eb100f', { item: 'newitem' }, (err, data) => {
      expect(err).to.be.null
      expect(data.attendees[1].checklist.length).to.equal(1)
      expect(data.attendees[1].checklist[0]).to.equal('newitem')
      done()
    })
  })

  xit('does not check unexisting checklist items', (done) => {
    sut.eventMutations.checkChecklistItem('participant', '58c567be9d4bf30001eb100f', { item: 'coucou' }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      done()
    })
  })

  //Uncheck checklist item

  it('unchecks checklist items', (done) => {
    sut.eventMutations.uncheckChecklistItem('participant', '58c567be9d4bf30001eb100f', { item: 'newitem' }, (err, data) => {
      expect(err).to.be.null
      expect(data.attendees[1].checklist.length).to.equal(0)
      done()
    })
  })

  //Vote

  it('can vote', (done) => {
    sut.eventMutations.vote('participant', '58c567be9d4bf30001eb100f', { question: 'poll2', choice:'choice1' }, (err, data) => {
      expect(err).to.be.null
      expect(data.attendees[1].polls.length).to.equal(1)
      expect(data.attendees[1].polls[0].question).to.equal('poll2')
      expect(data.attendees[1].polls[0].choice).to.equal('choice1')
      done()
    })
  })

  xit('cannot vote for unexisting choice', (done) => {
    sut.eventMutations.vote('participant', '58c567be9d4bf30001eb100f', { question: 'poll2', choice:'choice4' }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      done()
    })
  })

  //Place

  it('selects a place', (done) => {
    sut.eventMutations.selectPlace('participant', '58c567be9d4bf30001eb100f', { place: 'myPlace' }, (err, data) => {
      expect(err).to.be.null
      expect(data.attendees[1].places.length).to.equal(1)
      expect(data.attendees[1].places[0]).to.equal('myPlace')
      done()
    })
  })

  xit('cannot select an unexisting place', (done) => {
    sut.eventMutations.selectPlace('participant', '58c567be9d4bf30001eb100f', { place: 'mars' }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      done()
    })
  })

  it('unselects a place', (done) => {
    sut.eventMutations.unselectPlace('participant', '58c567be9d4bf30001eb100f', { place: 'myPlace' }, (err, data) => {
      expect(err).to.be.null
      expect(data.attendees[1].places.length).to.equal(0)
      done()
    })
  })

  //select datetime

  it('selects a date time', (done) => {
    sut.eventMutations.selectDatetime('participant', '58c567be9d4bf30001eb100f', { date: '2017-07-25' }, (err, data) => {
      expect(err).to.be.null
      expect(data.attendees[1].dates.length).to.equal(1)
      expect(data.attendees[1].dates[0]).to.equal('2017-07-25')
      done()
    })
  })

  xit('does not select unexisting date times', (done) => {
    sut.eventMutations.selectDatetime('participant', '58c567be9d4bf30001eb100f', { date: '2018-07-25' }, (err, data) => {
      expect(err).to.be.null
      expect(data.lastErrorObject.updatedExisting).to.be.false
      done()
    })
  })

  //Unselect datetime

  it('unselect date time', (done) => {
    sut.eventMutations.unselectDatetime('participant', '58c567be9d4bf30001eb100f', { date: '2017-07-25' }, (err, data) => {
      expect(err).to.be.null
      expect(data.attendees[1].dates.length).to.equal(0)
      done()
    })
  })
})