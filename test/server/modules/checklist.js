module.exports = ({ sut, expect, db }) => {
  // Edition

  // Add checklist item
  it('adds a checklist item also create the checklist list', done => {
    sut.eventMutations.addChecklistItem(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { item: 'newitem' },
      data => {
        expect(data.checklist.length).to.equal(1);
        expect(data.checklist[0]).to.equal('newitem');
        done();
      }
    );
  });

  it('uses the mutation nested object and adds a checklist item to existing checklist list', done => {
    sut.mutateEvent(
      'testuser',
      '58c567be9d4bf30001eb100f',
      'addChecklistItem',
      { item: 'newItem2' },
      data => {
        expect(data.checklist.length).to.equal(2);
        expect(data.checklist[0]).to.equal('newitem');
        expect(data.checklist[1]).to.equal('newItem2');
        done();
      }
    );
  });

  it('adds a checklist item only if not exist already', done => {
    sut.eventMutations.addChecklistItem(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { item: 'newitem' },
      data => {
        expect(data.checklist.length).to.equal(2);
        done();
      }
    );
  });

  it('does not add a checklist item if not the admin', done => {
    sut.eventMutations.addChecklistItem(
      'anotherUser',
      '58c567be9d4bf30001eb100f',
      { item: 'newitem' },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.checklist.length).to.equal(2);
            done();
          });
      }
    );
  });

  //edit checklist item

  it('edits a checklist item', done => {
    sut.eventMutations.editChecklistItem(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { index: 1, value: 'editedItem' },
      data => {
        expect(data.checklist[1]).to.equal('editedItem');
        done();
      }
    );
  });

  //remove checklist item

  it('removes a checklist item', done => {
    sut.eventMutations.removeChecklistItem(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { item: 'editedItem' },
      data => {
        expect(data.checklist.length).to.equal(1);
        expect(data.checklist[0]).to.equal('newitem');
        done();
      }
    );
  });

  it('does not remove a checklist item if not admin', done => {
    sut.eventMutations.removeChecklistItem(
      'another',
      '58c567be9d4bf30001eb100f',
      { item: 'editedItem' },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.checklist.length).to.equal(1);
            done();
          });
      }
    );
  });

  it('removes nothing if the item does not exist', done => {
    sut.eventMutations.removeChecklistItem(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { item: 'gaga' },
      data => {
        expect(data.checklist.length).to.equal(1);
        done();
      }
    );
  });

  //Participation

  //Check checklist item

  it('checks checklist items', done => {
    sut.eventMutations.checkChecklistItem(
      'participant',
      '58c567be9d4bf30001eb100f',
      { item: 'newitem' },
      data => {
        expect(data.attendees[1].checklist.length).to.equal(1);
        expect(data.attendees[1].checklist[0]).to.equal('newitem');
        done();
      }
    );
  });

  it('does not check unexisting checklist items', done => {
    sut.eventMutations.checkChecklistItem(
      'participant',
      '58c567be9d4bf30001eb100f',
      { item: 'coucou' },
      data => {
        expect(data).to.be.null;
        done();
      }
    );
  });

  //Uncheck checklist item

  it('unchecks checklist items', done => {
    sut.eventMutations.uncheckChecklistItem(
      'participant',
      '58c567be9d4bf30001eb100f',
      { item: 'newitem' },
      data => {
        expect(data.attendees[1].checklist.length).to.equal(0);
        done();
      }
    );
  });
};
