const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost, comment;
  beforeEach((done) => {

    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Js is Good', content: 'dasfas fsdaf dsa' });

    joe.blogPosts.push(blogPost);

    // Built-in function, will run .then when all .save() are done
    Promise.all([joe.save(),blogPost.save()])
      .then(() => done());

  });

  it('users clean up dagling blogpost on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });

});
