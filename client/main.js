Template.registerHelper("formatDate", function(date) {
  return moment.utc(date).format("MM/DD/YYYY");
});
