define(['views/_base/view', 'text!templates/_base/blank.tpl', 'iscroll'], function(view, Template) {
  return view.extend({

    id: 'scroll',
    className: 'content',
    template: _.template(Template),

    initIScroll: function() {
      this.scroll = new iScroll(this.id);
      this.scroll.scrollTo(0, this.options.startY);
    },

    afterRender: function() {
      this.initIScroll();
    }

  });
});