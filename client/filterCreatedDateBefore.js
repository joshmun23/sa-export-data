Template.filterCreatedDateBefore.helpers({
});

Template.filterCreatedDateBefore.onRendered(function() {
    this.$('.datetimepicker.filterCreatedDateBefore').datetimepicker();
});
