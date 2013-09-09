define(['views/base/_baseView', 'views/base/_contentListView', 'text!templates/listViews/issuesView.tpl'], function(_baseView, _contentListView, Template) {
  return _baseView.extend({

    className: 'view issues',
    defaults: {
      header: {
        title: "Issues"
      },
      content: {
        view: _contentListView,
        template: _.template(Template),
        models: []
      }
    }
  });
});