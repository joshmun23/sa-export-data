Template.posts.onRendered(function(){
  // initialize queries
  $("#reportsPostsTable").tablesorter({
    theme : 'green'
  });
  // sort first item
  $('#reportsPostsTable th:first-child').trigger('click');

  // save this server call/callback for error rendering (future purposes?)
  // Meteor.call('setPosts', queries, function(err, success) {
  //   if(err) {
  //     $('#errors').append('<li>Could not retrieve Posts</li>')
  //       .fadeIn()
  //       .delay(1500)
  //       .fadeOut(400, function(){
  //         $(this).empty()
  //       });
  //   }
  //   else {
  //     Session.set('allPosts', success)
  //   }
  // })
});
Template.posts.events({
  'click th': function(e) {
    var outerTarget = e.target;
    var addOrChangeArrow = setTimeout(function(){
      var selectedHeader,
          checkHeaderElement,
          selectedHeaderIndex;

      // wait until the sorted header element is found
      while(true) {
        checkHeaderElement = _.contains(['descending', 'ascending'], $(outerTarget).attr('aria-sort'))
        if(checkHeaderElement) {
          selectedHeader = $(outerTarget)
          selectedHeaderIndex = selectedHeader.attr('data-column')
          break;
        } else {
          outerTarget = outerTarget.parentElement
        }
      }

      // add/remove arrows as appropriate
      if(checkHeaderElement) {
        clearAllArrows('#reportsPostsTable i.chevron')
        if(selectedHeader.attr('aria-sort') === 'descending') {
          toggleSortArrow(selectedHeader.children(), selectedHeaderIndex, 'desc')
        } else if(selectedHeader.attr('aria-sort') === 'ascending') {
          toggleSortArrow(selectedHeader.children(), selectedHeaderIndex, 'asc')
        }
        return console.log('arrow changed')
      }
      // re-run function until an arrow is added by tablesort package
      addOrChangeArrow
    }, 100)

    var toggleSortArrow = function(target, targetIdx, direction) {
      if(direction === 'desc') {
        target.append('<span id=' + targetIdx + ' style="float:right"><i class="chevron down icon"></i></span>')
      } else if (direction === 'asc') {
        target.append('<span id=' + targetIdx + ' style="float:right"><i class="chevron up icon"></i></span>')
      }
    };

    var clearAllArrows = function(selector) {
      $(selector).remove();
    }
  }
})
Template.posts.helpers({
  posts: function() {
    // fetch queried posts for client
    return Posts.find({}).fetch()
  },
  'categoriesList': function() {
    // fetch a list of all field names from Posts for dropdown
    // need to stringify the field names
    // var categories = Object.getOwnPropertyNames(Posts.findOne());
    // return categories.slice(1, categories.length)
    return [
      'Category', 'Sub Category', 'Quantity', 'Unit Of Measure',
      'Quality', 'Unit Price', 'Amount', 'Best By Date', 'Must Go By Date',
      'Created Date', 'Completed Date'
    ]
  }
});
