define(function() {
  return Backbone.View.extend({

    className: 'view',
    defaults: {
    },

    initialize: function() {
      this.options = _.extend({}, this.defaults, this.options);
      this.afterInitialize();
    },

    afterInitialize: function() {

    },

    render: function() {
      if(typeof(this.options.template) != "undefined") {
        this.template = this.options.template;
      }

      if(typeof(this._render) != "undefined") {
        this._render();
      } else {
        this.$el.html(this.template(this.options));
      }
      return this;
    },

    afterRender: function() {

    }

  });
});