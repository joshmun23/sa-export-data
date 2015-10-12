Template.registerHelper("formatDate", function(date) {
  return moment.utc(date).format("DD/MM/YYYY");
});

Template.posts.helpers({
  posts: function() {
    return Posts.find({}, {category: 1});
  }
});

// Template.post.helpers({
//   post: function() {
//     return Posts.findOne(Router.current().params._id);
//   }
// });

Template.exportData.events({
  "click #exportData": function() {
    alert('trigger');
    debugger;
    MyAppExporter.exportAllPosts();
  }
});

// Template.post.events({
//   "click #export": function() {
//     MyAppExporter.exportContact(Router.current().params._id);
//   }
// });
