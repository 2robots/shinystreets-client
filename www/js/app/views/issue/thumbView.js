define(['views/_base/thumbView', 'views/issue/metaView', 'views/issue/mediaView', 'text!templates/issue/thumbView.tpl'], function(thumbView, metaView, mediaView, Template) {
  return thumbView.extend({

    events: {
      "click": "openDetailView"
    },

    template: _.template(Template),
    className: 'issue thumb',

    _render: function() {
      var t = this;

      // render element
      t.$el.html(t.template(t.options));

      // render mediaView
      t.mediaView = new mediaView(this.options);
      t.$el.append(t.mediaView.render().$el);

      // render metaView
      t.metaView = new metaView(this.options);
      t.$el.append(t.metaView.render().$el);

      return this;
    },

    openDetailView: function() {
      this.options.app.routes.to("issue", this.options.model);
      return false;
    }
  });
});