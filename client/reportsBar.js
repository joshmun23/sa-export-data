Template.reportsBar.helpers({
});

Template.reportsBar.events({
  'click #filterPosts': function() {
    $('#postsFiltersContainer').slideToggle();
  },
  'click #postsFiltersSubmit': function() {
    var categoriesOptions = $('#postsFiltersContainer .postCategoriesFilters a')
    var postQueries = Session.get('postQueries')
    postQueries.categories = []

    for(var i = 0; i < categoriesOptions.length; i++) {
      postQueries.categories.push(categoriesOptions[i].dataset.value)
    }

    Session.set('postQueries', postQueries);
  },
  'click #postsFiltersReset': function() {
    Session.set('postQueries', {});
  }
})

Template.reportsBar.onRendered(function () {
});
