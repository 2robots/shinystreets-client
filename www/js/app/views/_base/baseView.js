define(['views/_base/view', 'views/_base/headerView', 'views/_base/contentView', 'AppScroll'], function(view, headerView, contentView) {
  return view.extend({

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
        this.options.header.view = headerView;
      }

      if(typeof(this.options.content.view) == "undefined") {
        this.options.content.view = contentView;
      }

      t.header = new this.options.header.view(this.options.header);
      t.header.options.app = t.options.app;
      t.header.options.model = t.options.model;

      t.content = new this.options.content.view(this.options.content);
      t.content.options.app = t.options.app;
      t.content.options.model = t.options.model;
      t.content.options.startY = t.options.startY;

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