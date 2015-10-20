Template.filterCreatedDateAfter.helpers({
});

Template.filterCreatedDateAfter.onRendered(function() {
    this.$('.datetimepicker.filterCreatedDateAfter').datetimepicker();
});
