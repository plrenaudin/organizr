const db = require('monk')(process.env.MONGODB_URI)
const expect = require('chai').expect
const sut = require('../../server/EventAPI.js')
const data = require('./fixtures.js')
const events = db.get('events')

describe('EventAPI test suite', () => {
  before((done) => {
    db.get('archive').drop().then(
      db.get('events').drop(() => {
        db.get('events').insert(data).then(done())
      })
    )
  })

  it('finds the user event list', (done) => {
    const result = sut.findByUser('testuser', (err, data) => {
      expect(err).to.be.null
      expect(data.length).to.equal(3)
      done()
    })
  })

  it('inserts a new event', (done) => {
    sut.createNew('newUser', () => {
      sut.findByUser('newUser', (err, data) => {
        expect(err).to.be.null
        expect(data.length).to.equal(1)
        done()
      })
    })
  })

  it('finds by id newly created events', (done) => {
    sut.createNew('newUser', (err,data) => {
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
    sut.participate('58c56a83ad49880001fc1a0c','new attendee', (err, data) => {
      expect(err).to.be.null
      expect(data.attendees.length).to.equal(2)
      done()
    })
  })

  it('does not add a new participation if already there', (done) => {
    sut.participate('58c56a83ad49880001fc1a0c','testuser', (err, data) => {
      expect(err).to.be.null
      expect(data.attendees.length).to.equal(2)
      done()
    })
  })

  it('deletes the event', (done) => {
    sut.findById("58c56a83ad49880001fc1a0c", (err, data) => {
      expect(err).to.be.null
      expect(data).not.to.be.null
      sut.deleteEvent('58c56a83ad49880001fc1a0c','testuser', () => {
        sut.findById("58c56a83ad49880001fc1a0c", (err2, data2) => {
          expect(err2).to.be.null
          expect(data2).to.be.null
          done()
        })
      })
    })
  })
})