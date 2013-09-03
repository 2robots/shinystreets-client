define(['iscroll'], function() {
  return Backbone.View.extend({

    id: 'scroll',
    className: 'content',

    render: function() {
      this.$el.html();

      return this;
    },

    afterRender: function() {
      this.scroll = new iScroll(this.id);
    }

  });
});