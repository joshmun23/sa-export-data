Template.filterAmountsGreaterThan.helpers({
  'categoriesList': function() {
    // fetch a list of all field names from Posts for dropdown
    // need to stringify the field names

    // save this for filter options/categories
    // var categories = Object.getOwnPropertyNames(Posts.findOne());
    // return categories.slice(1, categories.length)
    var categories = Categories.find({}).fetch()
    var postsFilterCategories = _.map(categories, function(category) {
      return category.name;
    });
    return postsFilterCategories
  }
});

Template.filterCategories.onRendered(function () {
  // add code for Semantic UI dropdowns
  $('.ui.dropdown')
    .dropdown()
  ;
});

