define(['backbone'], function() {
  return Backbone.Model.extend({
    idAttribute: "name",
    collection: undefined,

    initialiez: function(attributes, collection) {
      this.collection = collection;
    },
    beforeTo: function() {},
    afterTo: function() {}
  });
});