define(['views/_view', 'text!templates/base/headerView.tpl'], function(_view, Template) {
  return _view.extend({

    className: 'header',
    template: _.template(Template),
    defaults: {
      title: "View"
    }

  });
});