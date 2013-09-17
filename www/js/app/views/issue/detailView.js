define(['views/_base/contentDetailView', 'views/issue/metaView', 'views/issue/mediaView', 'text!templates/issue/detailView.tpl', 'photoswipe'], function(contentDetailView, metaView, mediaView, Template, photoswipe) {
  return contentDetailView.extend({

    template: _.template(Template),
    issue_container: undefined,

    _render: function() {
      var t = this;

      // create container
      t.issue_container = $('<div />', {class: "issue detail"});
      t.$el.html(t.issue_container);

      // render metaView
      t.metaView = new metaView(_.extend({showsolutions: false}, this.options));
      t.issue_container.append(t.metaView.render().$el);

      // render mediaView
      t.mediaView = new mediaView(_.extend({enablephotoswipe: true}, this.options));
      t.issue_container.append(t.mediaView.render().$el);

      // render element
      t.issue_container.append(t.template(t.options));

      return this;
    },

    afterRender: function() {
      this.initIScroll();
      this.metaView.afterRender();
      this.mediaView.afterRender();
    }
  });
});