define(['backbone'], function() {

  return Backbone.Collection.extend({
    idAttribute: 'id',
    model: undefined,
    app: undefined,

    initialize: function(models, app) {
      this.app = app;

      // call afterInitialize, so child-collections can do stuff on init
      this.afterInitialize();
    },

    afterInitialize: function() {

    }
  });
});