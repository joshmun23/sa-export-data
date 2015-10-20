Template.filterQualities.helpers({
  'qualitiesList': function() {
    // fetch a list of all field names from Posts for dropdown
    // need to stringify the field names

    // save this for filter options/categories
    // var categories = Object.getOwnPropertyNames(Posts.findOne());
    // return categories.slice(1, categories.length)
    var qualities = [
      'Simply Surplus',
      'Ugly but Lovely',
      'Short Shelf Life',
      'Prepared'
    ]

    return qualities
  }
});

Template.filterQualities.onRendered(function () {
});

