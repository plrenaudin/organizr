module.exports = ({ sut, expect }) => {
  it('finds the user event list', done => {
    sut.findByUser('testuser', data => {
      expect(data.length).to.equal(3);
      done();
    });
  });

  it('inserts a new event and set the admin', done => {
    sut.createNew('newUser', () => {
      sut.findByUser('newUser', data => {
        expect(data.length).to.equal(1);
        expect(data[0].admin).to.equal('newUser');
        done();
      });
    });
  });

  it('finds by id newly created events', done => {
    sut.createNew('newUser', data => {
      sut.findById(data._id, data2 => {
        expect(data2._id.equals(data._id)).to.be.true;
        done();
      });
    });
  });

  it('finds by id other events', done => {
    sut.findById('58c56a83ad49880001fc1a0c', data => {
      expect(data.info.title).to.equal('plop');
      done();
    });
  });

  it('adds a new participation', done => {
    sut.participate('58c56a83ad49880001fc1a0c', 'new attendee', data => {
      expect(data.attendees.length).to.equal(2);
      done();
    });
  });

  it('throws an error if the event does not exist and someone tries to participate', done => {
    sut.participate('cccccccccccccccccccccccc', 'anotherAttendee', err => {
      expect(err.message).to.equal('Event not found: cccccccccccccccccccccccc');
      done();
    });
  });

  it('does not add a new participation if already there', done => {
    sut.participate('58c56a83ad49880001fc1a0c', 'testuser', data => {
      expect(data.attendees.length).to.equal(2);
      done();
    });
  });

  it('deletes the event', done => {
    sut.findById('58c56a83ad49880001fc1a0c', data => {
      expect(data).not.to.be.null;
      sut.deleteEvent('58c56a83ad49880001fc1a0c', 'testuser', () => {
        sut.findById('58c56a83ad49880001fc1a0c', data2 => {
          expect(data2).to.be.null;
          done();
        });
      });
    });
  });

  it('throws an error if the event does not exist and someone tries to delete it', done => {
    sut.deleteEvent('cccccccccccccccccccccccc', 'someguy', err => {
      expect(err.message).to.equal('Event not found: cccccccccccccccccccccccc');
      done();
    });
  });
};
