const assert = require('assert');
const User = require('../src/user');

describe ('update records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});

    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => {
        User.find({})
          .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'alex');
            done();
          });
      });
  }

  it('instance set n save', (done) => {
    joe.set('name', 'alex');

    assertName(joe.save(), done)

  });

  it('a model instance can update', (done) => {
    assertName(joe.update({ name: 'alex'}),done);

  })
})
