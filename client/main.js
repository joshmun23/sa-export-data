Template.registerHelper("formatDate", function(date) {
  return moment.utc(date).format("MM/DD/YYYY");
});

Template.registerHelper('formatNumbers', function(value) {
  var originalNumberString = value,
      reversedNumberString = '',
      formattedNumberString = '';
  if(typeof(originalNumberString) === 'number'){
    originalNumberString = String(originalNumberString)
  }
  if(originalNumberString.length > 3) {


    for(var i = originalNumberString.length - 1; i >= 0; i--) {
      reversedNumberString = reversedNumberString + originalNumberString[i]
    }

    formattedNumberString = reversedNumberString.match(/.{1,3}/g).reverse().join(',');
    return formattedNumberString
  } else {
    return value
  }
  // originalNumberString = originalNumberString.split('').jo
})
