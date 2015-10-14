Template.reportsBar.helpers({

});

Template.reportsBar.events({
  'click #filterPosts': function() {
    $('#postsFiltersContainer').slideToggle();
  }
})

Template.reportsBar.onRendered(function () {
});
