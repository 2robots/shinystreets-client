define(['views/base/_headerView', 'views/base/_contentView', 'AppScroll'], function(_headerView, _contentView) {
  return Backbone.View.extend({

    className: 'view',

    render: function() {

      var t = this;

      t.header = new _headerView;
      t.content = new _contentView;

      this.$el.append(t.header.render().$el);
      this.$el.append(t.content.render().$el);

      new AppScroll({
        toolbar: t.header.$el[0],
        scroller: t.content.$el[0]
      });

      this.renderContent();

      return this;
    },

    renderContent: function() {

    },

    afterRender: function() {
      this.header.afterRender();
      this.content.afterRender();
    }

  });
});