module.exports = ({ sut, expect }) => {
  //update info

  it('updates the info', done => {
    sut.eventMutations.updateInfo(
      'testuser',
      '58c567be9d4bf30001eb100f',
      { info: { title: 'myTitle', description: 'myDescription' } },
      data => {
        expect(data.info.title).to.equal('myTitle');
        expect(data.info.description).to.equal('myDescription');
        done();
      }
    );
  });

  it('generates the info if not exist', done => {
    sut.eventMutations.updateInfo(
      'infouser',
      '58c6f6a9cdee6c0001ea4d95',
      { info: { title: 'myTitle', description: 'myDescription' } },
      data => {
        expect(data.info.title).to.equal('myTitle');
        expect(data.info.description).to.equal('myDescription');
        done();
      }
    );
  });

  it('does not update info if not admin', done => {
    sut.eventMutations.updateInfo(
      'another',
      '58c567be9d4bf30001eb100f',
      { info: { title: 'hacktitle', description: 'hackdesc' } },
      data => {
        expect(data).to.be.null;
        done();
      }
    );
  });
};
