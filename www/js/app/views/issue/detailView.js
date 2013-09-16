define(['views/_base/contentDetailView', 'views/issue/metaView', 'text!templates/issue/detailView.tpl'], function(contentDetailView, metaView, Template) {
  return contentDetailView.extend({

    template: _.template(Template),
    issue_container: undefined,

    _render: function() {
      var t = this;

      // create container
      t.issue_container = $('<div />', {class: "issue detail"});
      t.$el.html(t.issue_container);

      // render metaView
      t.metaView = new metaView(this.options);
      t.issue_container.append(t.metaView.render().$el);

      // render element
      t.issue_container.append(t.template(t.options));
    }
  });
});