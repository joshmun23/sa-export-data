Template.exportData.events({
  "click #exportData": function() {
    // export current queried posts on page
    MyAppExporter.exportAllPosts({
      posts: Posts.find({}, {fields: {id: 0}}).fetch()
    });
  }
});
