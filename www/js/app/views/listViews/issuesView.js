define(['views/base/_baseView', 'text!templates/listViews/issuesView.tpl'], function(_baseView, Template) {
  return _baseView.extend({

    className: 'view issues',
    template: _.template(Template),

    renderContent: function() {
      this.content.$el.html(this.template());
    }
  });
});