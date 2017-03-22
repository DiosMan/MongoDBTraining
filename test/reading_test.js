const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  // Because the collection was drop at test_helper
  // We need to creat a new collection for this test
  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => done());
  });


  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then( (users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      } );
  });
})
