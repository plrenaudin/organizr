module.exports = ({ sut, expect, db }) => {
  //Edition

  //add place
  it('adds a place item also create the place list', done => {
    sut.eventMutations.addPlace(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { place: { name: 'myPlace' } },
      data => {
        expect(data.places.length).to.equal(1);
        expect(data.places[0].name).to.equal('myPlace');
        done();
      }
    );
  });

  it('adds a place item to existing place list', done => {
    sut.eventMutations.addPlace(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { place: { name: 'myPlace2' } },
      data => {
        expect(data.places.length).to.equal(2);
        expect(data.places[0].name).to.equal('myPlace');
        expect(data.places[1].name).to.equal('myPlace2');
        done();
      }
    );
  });

  it('adds a place item only if not exist already', done => {
    sut.eventMutations.addPlace(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { place: { name: 'myPlace' } },
      data => {
        expect(data.places.length).to.equal(2);
        done();
      }
    );
  });

  it('does not add a place item if not the admin', done => {
    sut.eventMutations.addPlace(
      'anotherUser',
      '58c567be9d4bf30001eb100f',
      { place: { name: 'gaga' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.places.length).to.equal(2);
            done();
          });
      }
    );
  });

  // remove place

  it('removes a place', done => {
    sut.eventMutations.removePlace(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { place: { name: 'myPlace2' } },
      data => {
        expect(data.places.length).to.equal(1);
        expect(data.places[0].name).to.equal('myPlace');
        done();
      }
    );
  });

  it('does not remove a place if not admin', done => {
    sut.eventMutations.removePlace(
      'another',
      '58c567be9d4bf30001eb100f',
      { place: { name: 'myPlace2' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.places.length).to.equal(1);
            done();
          });
      }
    );
  });

  it('removes nothing if the place does not exist', done => {
    sut.eventMutations.removePlace(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { place: { name: 'unexisintg' } },
      data => {
        expect(data.places.length).to.equal(1);
        done();
      }
    );
  });

  //Participation

  //Place

  it('selects a place', done => {
    sut.eventMutations.selectPlace(
      'participant',
      '58c567be9d4bf30001eb100f',
      { place: 'myPlace' },
      data => {
        expect(data.attendees[1].places.length).to.equal(1);
        expect(data.attendees[1].places[0]).to.equal('myPlace');
        done();
      }
    );
  });

  it('cannot select an unexisting place', done => {
    sut.eventMutations.selectPlace(
      'participant',
      '58c567be9d4bf30001eb100f',
      { place: 'mars' },
      data => {
        expect(data).to.be.null;
        done();
      }
    );
  });

  it('unselects a place', done => {
    sut.eventMutations.unselectPlace(
      'participant',
      '58c567be9d4bf30001eb100f',
      { place: 'myPlace' },
      data => {
        expect(data.attendees[1].places.length).to.equal(0);
        done();
      }
    );
  });
};
