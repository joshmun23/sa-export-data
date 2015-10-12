Meteor.methods({
  exportAllPosts: function() {
    var fields = [
      "category",
      "sub-category",
      "quantity",
      "unit of measure",
      "quality",
      "unit price",
      "amount",
      "location",
      "best by date",
      "must go by date",
      "address"
    ];

    var fieldNames = Object.getOwnPropertyNames(Posts.findOne())

    var data = [];

    var posts = Posts.find().fetch();
    _.each(posts, function(c) {
      data.push([
        c.category,
        c.subCategory,
        c.quantity,
        c.unitOfMeasure,
        c.quality,
        c.unitPrice,
        c.amount,
        c.location,
        c.bestByDate,
        c.mustgoByDate,
        c.formattedAddress
      ]);
    });

    return {fields: fields, data: data};
  }
  // exportPost: function(id) {
  //   var fields = [
  //     "Name",
  //     "Gender",
  //     "Date of Affiliation",
  //     "Country",
  //     "City"
  //   ];

  //   var data = [];

  //   var c = Posts.findOne(id);
  //   data.push([
  //     c.name,
  //     c.gender,
  //     moment.utc(c.createdAt).format("DD/MM/YYYY"),
  //     c.address.country,
  //     c.address.city
  //   ]);

  //   return {fields: fields, data: data};
  // }
});
