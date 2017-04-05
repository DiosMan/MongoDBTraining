const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  beforeEach((done) => {
    let joe, blogPost, comment;

    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Js is Good', content: 'dasfas fsdaf dsa' });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // Built-in function, will run .then when all .save() are done
    Promise.all([joe.save(),blogPost.save(),comment.save()])
      .then(() => done());

  });

  // it.only =>   when you only want to run the one test
  it('saves a relation between a user and a blogpost',(done) =>{

    User.findOne({ name: 'Joe' })
      // pull data from the associated collection
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Js is Good');
        done();
    });

  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe'})
      .populate({
        path: 'blogPosts',
        model: 'blogPost',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'Js is Good');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      })
  });


});
