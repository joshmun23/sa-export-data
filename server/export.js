Meteor.methods({
  setPosts: function(queries) {
    // fetch posts based on queries
    return Posts.find({}, queries).fetch()
  }
});
