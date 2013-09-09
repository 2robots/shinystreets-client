define(['views/_view', 'text!templates/blank.tpl', 'iscroll'], function(_view, Template) {
  return _view.extend({

    id: 'scroll',
    className: 'content',
    template: _.template(Template),

    afterRender: function() {
      this.scroll = new iScroll(this.id);
    }

  });
});