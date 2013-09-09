define(['views/_view', 'views/base/_headerView', 'views/base/_contentView', 'AppScroll'], function(_view, _headerView, _contentView) {
  return _view.extend({

    defaults: {
      header: {
        title: "View"
      },
      content: {
        models: []
      }
    },

    render: function() {

      var t = this;

      if(typeof(this.options.header.view) == "undefined") {
        this.options.header.view = _headerView;
      }

      if(typeof(this.options.content.view) == "undefined") {
        this.options.content.view = _contentView;
      }

      t.header = new this.options.header.view(this.options.header);
      t.content = new this.options.content.view(this.options.content);

      this.$el.append(t.header.render().$el);
      this.$el.append(t.content.render().$el);

      new AppScroll({
        toolbar: t.header.$el[0],
        scroller: t.content.$el[0]
      });

      return this;
    },

    afterRender: function() {
      this.header.afterRender();
      this.content.afterRender();
    }

  });
});