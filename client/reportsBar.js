Template.reportsBar.helpers({
});

Template.reportsBar.events({
  'click #filterPosts': function() {
    $('#postsFiltersContainer').slideToggle();
  },
  'click #postsFiltersSubmit': function() {
    var categoriesOptions = $('#postsCategoriesFilters a'),
        subCategoriesOptions = $('#postsFiltersContainer .postsSubCategoriesFilters a'),
        qualitiesOptions = $('#postsQualitiesFilters a'),
        amountsLessThan = $('#postsAmountsFiltersLessThan input:not([value=""])'),
        amountsGreaterThan = $('#postsAmountsFiltersGreaterThan input:not([value=""])'),
        postQueries = [];

    // check for existing amount queries
    var amountQueries = _.chain(postQueries)
                         .pluck('amount')
                         .compact()
                         .value();

    var amountsLessThanExists = false;
    var amountsLessThanIdx;
    var amountsGreaterThanExists = false;
    var amountsGreaterThanIdx;

    amountQueries = _.each(amountQueries, function(val, key) {
      if(val['$lt']) {
        amountsLessThanExists = true;
        amountsLessThanIdx = key;
      }
      if(val['$gt']) {
        amountsGreaterThanExists = true;
        amountsGreaterThanIdx = key;
      }
    })
    // end check for amount queries

    if(categoriesOptions.length > 0) {
      for(var i = 0; i < categoriesOptions.length; i++) {
        postQueries.push({
          category: categoriesOptions[i].dataset.value
        })
      }
    }

    if(subCategoriesOptions.length > 0) {
      for(var i = 0; i < subCategoriesOptions.length; i++) {
        postQueries.push({
          subCategory: subCategoriesOptions[i].dataset.value
        })
      }
    }

    if(qualitiesOptions.length > 0) {
      for(var i = 0; i < qualitiesOptions.length; i++) {
        postQueries.push({
          quality: qualitiesOptions[i].dataset.value
        })
      }
    }

    if(amountsLessThan.length > 0 && amountsLessThan[0].value !== '') {
      if(amountsLessThanExists) {
        postQueries[amountsLessThanIdx].amount = {
              $lt: parseInt(amountsLessThan[0].value)
        }
      } else {
        postQueries.push({
          'amount': { $lt: parseInt(amountsLessThan[0].value) }
        })
      }
    }

    if(amountsGreaterThan.length > 0 && amountsGreaterThan[0].value !== '') {
      if(amountsGreaterThanExists) {
        postQueries[amountsGreaterThanIdx].amount = {
          $gt: parseInt(amountsGreaterThan[0].value)
        }
      } else {
        postQueries.push({
          'amount': { $gt: parseInt(amountsGreaterThan[0].value) }
        })
      }
    }

    Session.set('postQueries', postQueries);
  },
  'click #postsFiltersReset': function() {
    Session.set('postQueries', []);
  }
})

Template.reportsBar.onRendered(function () {
  Session.setDefault('postQueries', []);
  var postQueries = Session.get('postQueries'),
      selectedQueries = {};
  if(_.size(postQueries)) {
    _.each(postQueries, function(val, key) {
      if(val['category']) {
        selectedQueries.categories = selectedQueries.categories ? selectedQueries.categories : [];
        selectedQueries.categories.push(val['category'])
      }
      if(val['quality']) {
        selectedQueries.qualities = selectedQueries.qualities ? selectedQueries.qualities : [];
        selectedQueries.qualities.push(val['quality'])
      }
      if(val['amount']) {
        selectedQueries.amounts = selectedQueries.amounts ? selectedQueries.amounts : [];
        selectedQueries.amounts.push(val['amount'])
      }
    })

    _.each(selectedQueries.amounts, function(val, key) {
      if(val['$lt']) {
        $('#postsAmountsFiltersLessThan input').val(val['$lt'])
      }
      if(val['$gt']) {
        $('#postsAmountsFiltersGreaterThan input').val(val['$gt'])
      }
    })
  }

  $('.ui.dropdown.categories')
    .dropdown('set selected', selectedQueries.categories)
  ;
  $('.ui.dropdown.qualities')
    .dropdown('set selected', selectedQueries.qualities)
  ;
});
