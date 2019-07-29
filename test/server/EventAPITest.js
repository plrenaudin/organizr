const db = require('monk')(process.env.MONGODB_URI);
const expect = require('chai').expect;
const sut = require('../../server/EventAPI.js');
const data = require('./fixtures.js');
const eventTests = require('./modules/event');
const checklistTests = require('./modules/checklist');
const infoTests = require('./modules/info');
const locationTests = require('./modules/location');
const calendarTests = require('./modules/calendar');
const pollTests = require('./modules/polls');

describe('EventAPI test suite', () => {
  before(done => {
    db.get('archive').drop(() => {
      db.get('events').drop(() => {
        db.get('events').insert(data, () => {
          done();
        });
      });
    });
  });

  eventTests({ sut, expect });
  infoTests({ sut, expect });
  calendarTests({ sut, expect, db });
  locationTests({ sut, expect, db });
  checklistTests({ sut, expect, db });
  pollTests({ sut, expect, db });
});
