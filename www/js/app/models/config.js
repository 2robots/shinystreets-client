define(['backbone'], function() {
  return Backbone.Model.extend({

    app: undefined,

    initialize: function(a, app) {
      // get app instance
      this.app = app;
    },

  });
});