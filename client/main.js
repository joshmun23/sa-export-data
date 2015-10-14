Template.registerHelper("formatDate", function(date) {
  return moment.utc(date).format("DD/MM/YYYY");
});
