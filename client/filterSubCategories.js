Template.filterSubCategories.helpers({
  subCategoriesList: function() {
    var subCategories = Categories.find({}, {
      fields: {
        subCategories: 1
      }
    }).fetch()

    // fetch each categories sub categories
    var postsFilterSubCategories = _.map(subCategories, function(category) {
      return category.subCategories;
    });
    // flatten array
    postsFilterSubCategories = [].concat.apply([], postsFilterSubCategories)

    return postsFilterSubCategories
  }
});

Template.filterSubCategories.onRendered(function () {
  // add code for Semantic UI dropdowns
  $('.ui.dropdown')
    .dropdown()
  ;
});

