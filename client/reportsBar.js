Template.reportsBar.helpers({
});

Template.reportsBar.events({
  'click #filterPosts': function() {
    $('#postsFiltersContainer').slideToggle();
  },
  // 'click i.glyphicon-calendar': function(e) {
  //   $('#postsFiltersSubmit').prop('disabled', false);
  //   debugger;
  // },
  'click #postsFiltersSubmit': function(e) {
    e.preventDefault();
    // prevent script if any errors on page
    if(_.size($('.parsley-errors-list.filled'))) {
      return console.log('There are errors on the page')
    }
    var categoriesOptions = $('#postsCategoriesFilters a'),
        subCategoriesOptions = $('#postsFiltersContainer .postsSubCategoriesFilters a'),
        qualitiesOptions = $('#postsQualitiesFilters a'),
        amountsLessThan = $('#postsAmountsFiltersLessThan input:not([value=""])'),
        amountsGreaterThan = $('#postsAmountsFiltersGreaterThan input:not([value=""])'),
        postQueries = [];
    var dates = {
      createdBefore: $('.input-group.datetimepicker.filterCreatedDateBefore input.set-due-date').val(),
      createdAfter: $('.input-group.datetimepicker.filterCreatedDateAfter input.set-due-date').val(),
      completedBefore: $('.input-group.datetimepicker.filterCompletedDateBefore input.set-due-date').val(),
      completedAfter: $('.input-group.datetimepicker.filterCompletedDateAfter input.set-due-date').val()
    }

    // check for existing amount&date queries
    var amountQueries = _.chain(postQueries)
                         .pluck('amount')
                         .compact()
                         .value();

    var amountsLessThanExists = false;
    var amountsLessThanIdx;
    var amountsGreaterThanExists = false;
    var amountsGreaterThanIdx;

    var createdDateQueries = _.chain(postQueries)
                              .pluck('createdDate')
                              .compact()
                              .value();

    var completedDateQueries = _.chain(postQueries)
                              .pluck('completedDate')
                              .compact()
                              .value();

    var createdDateBeforeExists = false,
        createdDateBeforeIdx,
        createdDateAfterExists  = false,
        createdDateAfterIdx;

    var completedDateBeforeExists = false,
        completedDateBeforeIdx,
        completedDateAfterExists  = false,
        completedDateAfterIdx;

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

    createdDateQueries = _.each(createdDateQueries, function(val, key) {
      if(val['$lt']) {
        createdDateBeforeExists = true;
        createdDateBeforeIdx = key;
      }
      if(val['$gt']) {
        createdDateAfterExists = true;
        createdDateAfterIdx = key;
      }
    })

    completedDateQueries = _.each(completedDateQueries, function(val, key) {
      if(val['$lt']) {
        completedDateBeforeExists = true;
        completedDateBeforeIdx = key;
      }
      if(val['$gt']) {
        completedDateBeforeIdx = true;
        completedDateAfterIdx = key;
      }
    })

    // end check for amount&date queries

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

    if(dates.createdBefore && dates.createdBefore.value !== '') {
      var convertedDate = moment.utc(dates.createdBefore)._d

      if(createdDateBeforeExists) {
        postQueries[createdDateBeforeIdx].createdDate = {
          $lt: convertedDate
        }
      } else {
        postQueries.push({
          'createdDate': { $lt: convertedDate }
        })
      }
    }

    if(dates.createdAfter && dates.createdAfter.value !== '') {
      var convertedDate = moment.utc(dates.createdAfter)._d

      if(createdDateAfterExists) {
        postQueries[createdDateAfterIdx].createdDate = {
          $gt: convertedDate
        }
      } else {
        postQueries.push({
          'createdDate': { $gt: convertedDate }
        })
      }
    }

    if(dates.completedBefore && dates.completedBefore.value !== '') {
      var convertedDate = moment.utc(dates.completedBefore)._d

      if(completedDateBeforeExists) {
        postQueries[completedDateBeforeIdx].completedDate = {
          $lt: convertedDate
        }
      } else {
        postQueries.push({
          'completedDate': { $lt: convertedDate }
        })
      }
    }

    if(dates.completedAfter && dates.completedAfter.value !== '') {
      var convertedDate = moment.utc(dates.completedAfter)._d
      debugger;
      if(completedDateAfterExists) {
        postQueries[completedDateAfterIdx].completedDate = {
          $gt: convertedDate
        }
      } else {
        postQueries.push({
          'completedDate': { $gt: convertedDate }
        })
      }
    }

    if(_.size(postQueries)) {
      debugger;

      Session.set('postQueries', postQueries);
    }
  },
  'click #postsFiltersReset': function() {
    Session.set('postQueries', []);
  }
})

Template.reportsBar.onRendered(function () {
  Session.setDefault('postQueries', []);

  // input previous queries into each field
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
      if(val['createdDate']) {
        selectedQueries.createdDate = selectedQueries.createdDate ? selectedQueries.createdDate : [];
        selectedQueries.createdDate.push(val['createdDate'])
      }
      if(val['completedDate']) {
        selectedQueries.completedDate = selectedQueries.completedDate ? selectedQueries.createdDate : [];
        selectedQueries.completedDate.push(val['completedDate'])
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

    _.each(selectedQueries.createdDate, function(val, key) {
      if(val['$lt']) {
        var formattedDate = moment.utc(val['$lt']).format('MM/DD/YYYY');
        $('.datetimepicker.filterCreatedDateBefore input').val(formattedDate)
      }
      if(val['$gt']) {
        var formattedDate = moment.utc(val['$gt']).format('MM/DD/YYYY');
        $('.datetimepicker.filterCreatedDateAfter input').val(formattedDate)
      }
    })

    _.each(selectedQueries.completedDate, function(val, key) {
      if(val['$lt']) {
        var formattedDate = moment.utc(val['$lt']).format('MM/DD/YYYY');
        $('.datetimepicker.filterCompletedDateBefore input').val(formattedDate)
      }
      if(val['$gt']) {
        var formattedDate = moment.utc(val['$gt']).format('MM/DD/YYYY');
        $('.datetimepicker.filterCompletedDateAfter input').val(formattedDate)
      }
    })
  }

  $('.ui.dropdown.categories').dropdown('set selected', selectedQueries.categories);
  $('.ui.dropdown.qualities').dropdown('set selected', selectedQueries.qualities);

  $('.datetimepicker.filterCreatedDateBefore').datetimepicker({
    format: 'MM/DD/YYYY',
    maxDate: new Date()
  });
  $('.datetimepicker.filterCreatedDateAfter').datetimepicker({
    format: 'MM/DD/YYYY',
    maxDate: new Date()
  });
  $('.datetimepicker.filterCompletedDateBefore').datetimepicker({
    format: 'MM/DD/YYYY',
    maxDate: new Date()
  });
  $('.datetimepicker.filterCompletedDateAfter').datetimepicker({
    format: 'MM/DD/YYYY',
    maxDate: new Date()
  });

  var parsleyConfig = {
    errorsContainer: function(pEle) {
      var $err = pEle.$element.siblings('.errorBlock');
      console.log($err);
      return $err;
    },
    trigger: 'change'
  }

  var $parsley = $('#postsFiltersQueries').parsley(parsleyConfig);
});
