Template.posts.onRendered(function(){
  // initialize queries
  Session.setDefault('postQueries', {});

  // save this server call/callback for error rendering (future purposes?)
  // Meteor.call('setPosts', queries, function(err, success) {
  //   if(err) {
  //     $('#errors').append('<li>Could not retrieve Posts</li>')
  //       .fadeIn()
  //       .delay(1500)
  //       .fadeOut(400, function(){
  //         $(this).empty()
  //       });
  //   }
  //   else {
  //     Session.set('allPosts', success)
  //   }
  // })
});
Template.posts.events({
  'click th': function(e) {
    $('#reportsPostsTable').tablesort();
    debugger;
  }
})
Template.posts.helpers({
  posts: function() {
    // fetch queried posts for client
    return Posts.find({}).fetch()
  },
  'categoriesList': function() {
    // fetch a list of all field names from Posts for dropdown
    // need to stringify the field names
    // var categories = Object.getOwnPropertyNames(Posts.findOne());
    // return categories.slice(1, categories.length)
    return [
      'Category', 'Sub Category', 'Quantity', 'Unit Of Measure',
      'Quality', 'Unit Price', 'Amount', 'Best By Date', 'Must Go By Date',
      'Created Date', 'Completed Date'
    ]
  }
});
