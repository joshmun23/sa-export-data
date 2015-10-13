Template.registerHelper("formatDate", function(date) {
  return moment.utc(date).format("DD/MM/YYYY");
});

Template.posts.onRendered(function(){
  // initialize queries
  Session.setDefault('postQueries', {});
  var queries = Session.get('postQueries');

  Meteor.call('setPosts', queries, function(err, success) {
    if(err) {
      $('#errors').append('<li>Could not retrieve Posts</li>')
        .fadeIn()
        .delay(1500)
        .fadeOut(400, function(){
          $(this).empty()
        });

    }
    else {
      Session.set('allPosts', success)
    }
  })
});

Template.posts.helpers({
  posts: function() {
    // fetch queried posts for client
    return Session.get('allPosts')
  }
});


Template.exportData.events({
  "click #exportData": function() {
    // export current queried posts on page
    MyAppExporter.exportAllPosts({
      posts: Session.get('allPosts')
    });
  }
});

Template.filterPosts.helpers({
  'categoriesList': function() {
    // fetch a list of all field names from Posts for dropdown
    // need to stringify the field names
    var categories = Object.getOwnPropertyNames(Posts.findOne());
    return categories
  }
})

Template.filterPosts.onRendered(function () {
  // add code for Semantic UI dropdowns
  $('.ui.dropdown')
    .dropdown()
  ;
});
