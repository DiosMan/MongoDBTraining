const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name:'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  })

  it('can add subdocument to exsiting users', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      // without {} in => function, it will automaticallly return the result of User.findOne
      .then(() => User.findOne({ name:'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post'});
        // Inside of {}, we need to return the promise
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an exsisting subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'new title'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name:'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
