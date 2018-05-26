module.exports = ({ sut, expect, db }) => {
  //Edition

  //add poll
  it('adds a poll also create the poll list', done => {
    sut.eventMutations.addPoll(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll1' } },
      data => {
        expect(data.polls.length).to.equal(1);
        expect(data.polls[0].question).to.equal('poll1');
        done();
      }
    );
  });

  it('adds a poll to existing poll list', done => {
    sut.eventMutations.addPoll(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2' } },
      data => {
        expect(data.polls.length).to.equal(2);
        expect(data.polls[0].question).to.equal('poll1');
        expect(data.polls[1].question).to.equal('poll2');
        done();
      }
    );
  });

  it('adds a poll only if not exist already', done => {
    sut.eventMutations.addPoll(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll1' } },
      data => {
        expect(data.polls.length).to.equal(2);
        done();
      }
    );
  });

  it('does not add a poll if not the admin', done => {
    sut.eventMutations.addPoll(
      'anotherUser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'haha' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.polls.length).to.equal(2);
            done();
          });
      }
    );
  });

  //edit poll

  it('edits a poll question', done => {
    sut.eventMutations.editPoll(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { index: 0, value: 'poll1Edited' },
      data => {
        expect(data.polls[0].question).to.equal('poll1Edited');
        done();
      }
    );
  });

  // remove poll

  it('removes a poll', done => {
    sut.eventMutations.removePoll(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll1Edited' } },
      data => {
        expect(data.polls.length).to.equal(1);
        expect(data.polls[0].question).to.equal('poll2');
        done();
      }
    );
  });

  it('does not remove a poll if not admin', done => {
    sut.eventMutations.removePoll(
      'another',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.polls.length).to.equal(1);
            done();
          });
      }
    );
  });

  it('removes nothing if the poll does not exist', done => {
    sut.eventMutations.removePoll(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'hihi' } },
      data => {
        expect(data.polls.length).to.equal(1);
        done();
      }
    );
  });

  //add poll choice

  it('adds a choice to a poll without choice yet', done => {
    sut.eventMutations.addPollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2', choice: 'choice1' } },
      data => {
        expect(data.polls.length).to.equal(1);
        expect(data.polls[0].choices.length).to.equal(1);
        expect(data.polls[0].choices[0]).to.equal('choice1');
        done();
      }
    );
  });

  it('adds a choice to a poll with choices', done => {
    sut.eventMutations.addPollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2', choice: 'choice2' } },
      data => {
        expect(data.polls.length).to.equal(1);
        expect(data.polls[0].choices.length).to.equal(2);
        expect(data.polls[0].choices[0]).to.equal('choice1');
        expect(data.polls[0].choices[1]).to.equal('choice2');
        done();
      }
    );
  });

  it('adds a choice only if not exist already', done => {
    sut.eventMutations.addPollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2', choice: 'choice2' } },
      data => {
        expect(data.polls.length).to.equal(1);
        expect(data.polls[0].choices.length).to.equal(2);
        done();
      }
    );
  });

  it('does not add a choice if not the admin', done => {
    sut.eventMutations.addPollChoice(
      'anotherUser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2', choice: 'choice3' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.polls.length).to.equal(1);
            expect(data2.polls[0].choices.length).to.equal(2);
            done();
          });
      }
    );
  });

  it('does not add a choice if poll does not exist', done => {
    sut.eventMutations.addPollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'pollNotExisting', choice: 'choice3' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.polls.length).to.equal(1);
            expect(data2.polls[0].choices.length).to.equal(2);
            done();
          });
      }
    );
  });

  //edit poll choice

  it('edits a poll choice', done => {
    sut.eventMutations.editPollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { indexPoll: 0, indexChoice: 1, value: 'choice2Edited' },
      data => {
        expect(data.polls[0].choices[1]).to.equal('choice2Edited');
        done();
      }
    );
  });
  // remove poll choice

  it('removes a poll choice', done => {
    sut.eventMutations.removePollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2', choice: 'choice2Edited' } },
      data => {
        expect(data.polls.length).to.equal(1);
        expect(data.polls[0].choices.length).to.equal(1);
        expect(data.polls[0].choices[0]).to.equal('choice1');
        done();
      }
    );
  });

  it('does not remove a poll choice if not admin', done => {
    sut.eventMutations.removePollChoice(
      'another',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2', choice: 'choice1' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.polls.length).to.equal(1);
            expect(data2.polls[0].choices.length).to.equal(1);
            expect(data2.polls[0].choices[0]).to.equal('choice1');
            done();
          });
      }
    );
  });

  it('removes nothing if the poll does not exist', done => {
    sut.eventMutations.removePollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll not existing', choice: 'choice2' } },
      data => {
        expect(data).to.be.null;
        db
          .get('events')
          .findOne({ _id: '58c567be9d4bf30001eb100f' })
          .then(data2 => {
            expect(data2.polls.length).to.equal(1);
            expect(data2.polls[0].choices.length).to.equal(1);
            done();
          });
      }
    );
  });

  it('removes nothing if the choice does not exist', done => {
    sut.eventMutations.removePollChoice(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { poll: { question: 'poll2', choice: 'choice3' } },
      data => {
        expect(data.polls.length).to.equal(1);
        expect(data.polls[0].choices.length).to.equal(1);
        done();
      }
    );
  });

  // Participation

  //Vote

  it('can vote', done => {
    sut.eventMutations.vote(
      'participant',
      '58c567be9d4bf30001eb100f',
      { question: 'poll2', choice: 'choice1' },
      data => {
        expect(data.attendees[1].polls.length).to.equal(1);
        expect(data.attendees[1].polls[0].question).to.equal('poll2');
        expect(data.attendees[1].polls[0].choice).to.equal('choice1');
        done();
      }
    );
  });

  it('cannot vote for unexisting choice', done => {
    sut.eventMutations.vote(
      'participant',
      '58c567be9d4bf30001eb100f',
      { question: 'poll2', choice: 'choice4' },
      data => {
        expect(data).to.be.null;
        done();
      }
    );
  });
};
