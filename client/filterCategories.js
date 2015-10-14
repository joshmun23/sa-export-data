Template.filterCategories.helpers({
  'categoriesList': function() {
    // fetch a list of all field names from Posts for dropdown
    // need to stringify the field names
    var categories = Object.getOwnPropertyNames(Posts.findOne());
    return categories.slice(1, categories.length)
  }
});

Template.filterCategories.onRendered(function () {
  // add code for Semantic UI dropdowns
  $('.ui.dropdown')
    .dropdown()
  ;
});
