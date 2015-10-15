Meteor.publish('posts', function(postQueries) {
  if (typeof(postQueries) === 'object' && typeof(postQueries.categories) === 'object') {
    console.log('queries are: ' + postQueries.categories)
    console.log('type of categories is: ' + typeof(postQueries.categories))

    return Posts.find({
      category: {$in: postQueries.categories}
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
