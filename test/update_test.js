const assert = require('assert');
const User = require('../src/user');

describe ('update records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0});

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

  });

  it('a model class can update', (done) => {

    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name:'alex' }),
      done
    );

  });

  it('a model class can update one record', (done) => {

    assertName(
      User.findByIdAndUpdate(joe._id, { name:'alex' }),
      done
    );

  });

  it('A user can have their post count increatment by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 1 } })
      .then(() => { User.findOne({ name: 'Joe' })
        .then((user) => {
          assert(user.postCount === 1);
          done();
        });
    });
  });

})
