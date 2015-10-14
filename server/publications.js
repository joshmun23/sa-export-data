Meteor.publish('posts', function() {
  // if (this.userId) {
  //   console.log(this)
  //   return Meteor.users.find({_id: this.userId},
  //     {
  //       fields: {roles: 1}
  //     }
  //   );
  // } else {
  //   this.ready();
  // }

  return Posts.find({}, {
    fields: {
      category: 1,
      subCategory: 1,
      notes: 1,
      quantity: 1,
      unitOfMeasure: 1,
      quality: 1,
      unitPrice: 1,
      amount: 1,
      bestByDate: 1,
      mustGoByDate: 1,
    }
  })
})
