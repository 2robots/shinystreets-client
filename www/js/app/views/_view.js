define(function() {
  return Backbone.View.extend({

    className: 'view',
    defaults: {
      header: {},
      content: {}
    },

    initialize: function() {

      this.options.header = _.extend({}, this.defaults.header, this.options.header);
      this.options.content = _.extend({}, this.defaults.content, this.options.content);
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