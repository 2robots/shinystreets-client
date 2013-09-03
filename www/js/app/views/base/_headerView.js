define(['text!templates/base/headerView.tpl'], function(Template) {
  return Backbone.View.extend({

    className: 'header',
    title: "View",
    template: _.template(Template),

    render: function() {
      this.$el.html(this.template({ title: this.title }));

      return this;
    },

    afterRender: function() {

    }

  });
});