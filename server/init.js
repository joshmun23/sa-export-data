Meteor.startup(function() {
  var categories = [
    { name: 'Bulk/Mixed',
      subCategories: [
        'Bulk/Mixed',
        'Bakery Items',
        'Beverages',
        'Breakfast Items',
        'Canned Goods',
        'Dairy & Eggs',
        'Dry Goods & Pasta',
        'Frozen Items',
        'Meat & Seafood',
        'Organic Waste',
        'Pantry Items',
        'Prepared Food',
        'Produce',
        'Snacks',
        'Other'
      ]
    },
    { name: 'Bakery Items',
      subCategories: [
        'Bakery Desserts',
        'Bread',
        'Breakfast Baked Goods',
        'Bulk or Mixed Bakery Items',
        'Buns & Rolls',
        'Tortilla',
        'Other'
      ]
    },
    { name: 'Beverages',
      subCategories: [
        'Bulk or Mixed Beverage',
        'Coffee & Tea',
        'Drink Mixes',
        'Energy & Sports Drink',
        'Juice',
        'Soft Drinks',
        'Water',
        'Other'
      ]
    },
    { name: 'Breakfast Items',
      subCategories: [
        'Bulk or Mixed Breakfast Items',
        'Cereal',
        'Granola',
        'Hot Cereal & Mixes',
        'Other'
      ]
    },
    { name: 'Canned Goods',
      subCategories: [
        'Bulk or Mixed Canned Goods',
        'Canned Beans',
        'Canned Fruits',
        'Canned Meat & Seafood',
        'Canned Soup & Broth',
        'Canned Vegetables',
        'Other'
      ]
    },
    { name: 'Dairy & Eggs',
      subCategories: [
        'Bulk or Mixed Dairy & Egg',
        'Butter',
        'Cheese',
        'Cream',
        'Eggs',
        'Ice Cream',
        'Milk',
        'Yogurt',
        'Other'
      ]
    },
    { name: 'Dry Goods & Pasta',
      subCategories: [
        'Bulk or Mixed Dry Goods & Pasta',
        'Flour',
        'Grains & Rice',
        'Instant Food',
        'Pasta',
        'Pasta Sauce',
        'Other'
      ]
    },
    { name: 'Frozen Items',
      subCategories: [
        'Bulk or Mixed Frozen Items',
        'Frozen Appetizers',
        'Frozen Breakfast',
        'Frozen Dessert',
        'Frozen Meals',
        'Frozen Meat & Seafood',
        'Frozen Pizza',
        'Frozen Produce',
        'Frozen Starches',
        'Ice Cream',
        'Other'
      ]
    },
    { name: 'Meat & Seafood',
      subCategories: [
        'Bulk or Mixed Meat & Seafood',
        'Frozen Seafood',
        'Frozen Poultry',
        'Frozen Meat',
        'Lunch/Deli Meat',
        'Meat',
        'Packaged Meat',
        'Packaged Poultry',
        'Packaged Seafood',
        'Poultry',
        'Seafood',
        'Tofu',
        'Other'
      ]
    },
    { name: 'Organic Waste',
      subCategories: [
        'Other'
      ]
    },
    { name: 'Pantry Items',
      subCategories: [
        'Baking Supplies',
        'Bulk or Mixed Pantry Items',
        'Condiments',
        'Honey & Syrup',
        'Oil & Vinegar',
        'Salad Dressing',
        'Spices & Seasoning',
        'Spreads',
        'Other'
      ]
    },
    { name: 'Prepared Food',
      subCategories: [
        'Bulk or Mixed Prepared Food',
        'Prepared Bakery Items',
        'Prepared Breakfast Items',
        'Prepared Fruits',
        'Prepared Grain Salads',
        'Prepared Grains & Rice',
        'Prepared Leafy Salads',
        'Prepared Meat',
        'Prepared Pasta',
        'Prepared Poultry',
        'Prepared Seafood',
        'Prepared Vegetables',
        'Sandwiches & Deli Meat',
        'Soup',
        'Other'
      ]
    },
    { name: 'Produce',
      subCategories: [
        'Bulk or Mixed Produce',
        'Fresh Fruits',
        'Fresh Herbs',
        'Fresh Vegetables',
        'Frozen Fruits',
        'Frozen Vegetables',
        'Packaged Fruits',
        'Packaged Herbs',
        'Packaged Vegetables',
        'Tofu',
        'Other'
      ]
    },
    { name: 'Snacks',
      subCategories: [
        'Bulk or Mixed Snacks',
        'Chips & Pretzels',
        'Cookies & Cakes',
        'Crackers',
        'Nuts & Dried Fruit',
        'Other'
      ]
    },
    { name: 'Other',
      subCategories: [
        'Other'
      ]
    }
  ]

  var qualities = [
    'Simply Surplus',
    'Ugly but Lovely',
    'Short Shelf Life',
    'Prepared'
  ]

  if (Posts.find().count() === 0 ) {
    for(var i=0; i < 64; i++) {
      var categoriesIndex = Math.floor(
        Math.random() * categories.length
      );

      var subCategoriesIndex = Math.floor(
        Math.random() * categories[categoriesIndex].subCategories.length
      );

      var quantity = Math.floor(
        ((Math.random() * 1000) + 1000)
      );

      var qualityIndex = Math.floor(
        Math.random() * qualities.length
      );

      var unitPrice = Math.random() * 30;

      var radius = Math.floor(
        Math.random() * 100
      );

      var bestFakerDate = faker.date.past(),
          mustFakerDate = faker.date.past();

      var bestByDate = bestFakerDate.getMonth() + '/' + bestFakerDate.getDay() + '/'
                       + bestFakerDate.getUTCFullYear();

      var mustGoByDate = mustFakerDate.getMonth() + '/' + mustFakerDate.getDay() + '/'
                       + mustFakerDate.getUTCFullYear();

      var addressName = faker.address.streetName(),
          streetAddress = faker.address.streetAddress(),
          city = faker.address.city(),
          state = faker.address.stateAbbr(),
          zipCode = faker.address.zipCode(),
          fullAddress = addressName + ' ' + streetAddress + ' ' + city + ' ' + state + ' ' + zipCode,
          latitude = faker.address.latitude(),
          longitude = faker.address.longitude(),
          loc = latitude + ',' + longitude;

      Posts.insert({
        notes: faker.lorem.sentences(),
        category: categories[categoriesIndex].name,
        subCategory: categories[categoriesIndex].subCategories[subCategoriesIndex],
        quantity: quantity,
        unitOfMeasure: 'lbs',
        quality: qualities[qualityIndex],
        bestByDate: bestByDate,
        mustGoByDate: mustGoByDate,
        purpose: faker.lorem.sentence(),
        unitPrice: Math.round(unitPrice),
        amount: Math.round(unitPrice * quantity),
        locationData: 'Location',
        location: faker.company.companyName(),
        formattedAddress: fullAddress,
        country: 'United States of America',
        countryShort: 'US',
        state: state,
        loc: loc,
        longitude: longitude,
        latitude: latitude,
        delivery: 'some method',
        radius: radius,
        handling: 'some handling type',
        audience: 'some audience',
        postImagesIds: faker.image.food()
      })
    }
  }
})
