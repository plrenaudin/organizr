module.exports = ({ sut, expect, db }) => {
  //Edition

  //add date
  it('adds a date also create the date list', done => {
    sut.eventMutations.addDate(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25' } },
      data => {
        expect(data.dates.length).to.equal(1);
        expect(data.dates[0].day).to.equal('2017-07-25');
        done();
      }
    );
  });

  it('adds a date to existing date list', done => {
    sut.eventMutations.addDate(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-06-08' } },
      data => {
        expect(data.dates.length).to.equal(2);
        expect(data.dates[0].day).to.equal('2017-07-25');
        expect(data.dates[1].day).to.equal('2017-06-08');
        done();
      }
    );
  });

  it('adds a date only if not exist already', done => {
    sut.eventMutations.addDate(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-06-08' } },
      data => {
        expect(data.dates.length).to.equal(2);
        done();
      }
    );
  });

  it('does not add a date if not the admin', done => {
    sut.eventMutations.addDate(
      'anotherUser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-08-06' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.dates.length).to.equal(2);
            done();
          });
      }
    );
  });

  // remove date

  it('removes a date', done => {
    sut.eventMutations.removeDate(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: '2017-06-08' },
      data => {
        expect(data.dates.length).to.equal(1);
        expect(data.dates[0].day).to.equal('2017-07-25');
        done();
      }
    );
  });

  it('does not remove a date if not admin', done => {
    sut.eventMutations.removeDate(
      'another',
      '58c567be9d4bf30001eb100f',
      { date: '2017-07-25' },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.dates.length).to.equal(1);
            done();
          });
      }
    );
  });

  it('removes nothing if the date does not exist', done => {
    sut.eventMutations.removeDate(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: '2017-03-03' },
      data => {
        expect(data.dates.length).to.equal(1);
        done();
      }
    );
  });

  //add time

  it('adds a time to a day without time yet', done => {
    sut.eventMutations.addTime(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25', time: '15:30' } },
      data => {
        expect(data.dates.length).to.equal(1);
        expect(data.dates[0].times.length).to.equal(1);
        expect(data.dates[0].times[0]).to.equal('15:30');
        done();
      }
    );
  });

  it('adds a time to a day with time', done => {
    sut.eventMutations.addTime(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25', time: '18:30' } },
      data => {
        expect(data.dates.length).to.equal(1);
        expect(data.dates[0].times.length).to.equal(2);
        expect(data.dates[0].times[0]).to.equal('15:30');
        expect(data.dates[0].times[1]).to.equal('18:30');
        done();
      }
    );
  });

  it('adds a date only if not exist already', done => {
    sut.eventMutations.addTime(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25', time: '15:30' } },
      data => {
        expect(data.dates.length).to.equal(1);
        expect(data.dates[0].times.length).to.equal(2);
        done();
      }
    );
  });

  it('does not add a time if not the admin', done => {
    sut.eventMutations.addTime(
      'anotherUser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25', time: '15:30' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.dates.length).to.equal(1);
            expect(data2.dates[0].times.length).to.equal(2);
            done();
          });
      }
    );
  });

  it('does not add a time day does not exist', done => {
    sut.eventMutations.addTime(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-02-02', time: '15:30' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.dates.length).to.equal(1);
            expect(data2.dates[0].times.length).to.equal(2);
            done();
          });
      }
    );
  });

  // remove time

  it('removes a time', done => {
    sut.eventMutations.removeTime(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25', time: '15:30' } },
      data => {
        expect(data.dates.length).to.equal(1);
        expect(data.dates[0].times.length).to.equal(1);
        expect(data.dates[0].times[0]).to.equal('18:30');
        done();
      }
    );
  });

  it('does not remove a time if not admin', done => {
    sut.eventMutations.removeTime(
      'another',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25', time: '18:30' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.dates.length).to.equal(1);
            expect(data2.dates[0].times.length).to.equal(1);
            expect(data2.dates[0].times[0]).to.equal('18:30');
            done();
          });
      }
    );
  });

  it('removes nothing if the date does not exist', done => {
    sut.eventMutations.removeTime(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-23', time: '18:30' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.dates.length).to.equal(1);
            expect(data2.dates[0].times.length).to.equal(1);
            done();
          });
      }
    );
  });

  it('removes nothing if the time does not exist', done => {
    sut.eventMutations.removeTime(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { date: { day: '2017-07-25', time: '22:00' } },
      data => {
        expect(data.dates.length).to.equal(1);
        done();
      }
    );
  });

  //Participation

  //select datetime

  it('selects a date time', done => {
    sut.eventMutations.selectDatetime(
      'participant',
      '58c567be9d4bf30001eb100f',
      { date: '2017-07-25' },
      data => {
        expect(data.attendees[1].dates.length).to.equal(1);
        expect(data.attendees[1].dates[0]).to.equal('2017-07-25');
        done();
      }
    );
  });

  xit('does not select unexisting date times', done => {
    sut.eventMutations.selectDatetime(
      'participant',
      '58c567be9d4bf30001eb100f',
      { date: '2018-07-25' },
      data => {
        expect(data).to.be.null;
        done();
      }
    );
  });

  //Unselect datetime

  it('unselect date time', done => {
    sut.eventMutations.unselectDatetime(
      'participant',
      '58c567be9d4bf30001eb100f',
      { date: '2017-07-25' },
      data => {
        expect(data.attendees[1].dates.length).to.equal(0);
        done();
      }
    );
  });
};
