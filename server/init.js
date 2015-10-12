Meteor.startup(function() {
  var categories = [
    { name: 'bulk/mixed',
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
    { name: 'bakery items',
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
    { name: 'beverages',
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
    { name: 'breakfast items',
      subCategories: [
        'Bulk or Mixed Breakfast Items',
        'Cereal',
        'Granola',
        'Hot Cereal & Mixes',
        'Other'
      ]
    },
    { name: 'canned goods',
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
    { name: 'dairy & eggs',
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
    { name: 'dry goods & pasta',
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
    { name: 'frozen items',
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
    { name: 'meat & seafood',
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
    { name: 'organic waste',
      subCategories: [
        'Other'
      ]
    },
    { name: 'pantry items',
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
    { name: 'prepared food',
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
    { name: 'produce',
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
    { name: 'snacks',
      subCategories: [
        'Bulk or Mixed Snacks',
        'Chips & Pretzels',
        'Cookies & Cakes',
        'Crackers',
        'Nuts & Dried Fruit',
        'Other'
      ]
    },
    { name: 'other',
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
        bestByDate: faker.date.future(),
        mustGoByDate: faker.date.future(),
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
