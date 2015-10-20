Meteor.publish('posts', function(postQueries) {
  if(typeof(postQueries) === 'object' && !_.isEmpty(postQueries)) {
    for(var i=0; i < postQueries.length; i++) {
      console.log('postQueries[i].category is: ' + postQueries[i].category)
      console.log('postQueries[i].subCategory is: ' + postQueries[i].category)
      console.log('postQueries[i].quality is: ' + postQueries[i].quality)
      console.log('postQueries[i].amount is: ' + postQueries.amount)
    }
    return Posts.find({
      $or: postQueries
    },
    {
      fields: {
        category: 1,
        subCategory: 1,
        quantity: 1,
        unitOfMeasure: 1,
        quality: 1,
        unitPrice: 1,
        amount: 1,
        bestByDate: 1,
        mustGoByDate: 1,
        createdDate: 1,
        completedDate: 1
      }
    })
  }

  return Posts.find({}, {
    fields: {
      category: 1,
      subCategory: 1,
      quantity: 1,
      unitOfMeasure: 1,
      quality: 1,
      unitPrice: 1,
      amount: 1,
      bestByDate: 1,
      mustGoByDate: 1,
      createdDate: 1,
      completedDate: 1
    }
  })
})

Meteor.publish('categories', function() {
  return Categories.find()
})
