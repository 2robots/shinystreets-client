define(['views/_base/view', 'text!templates/issue/mediaView.tpl'], function(view, Template) {
  return view.extend({

    defaults: {
      showmap: false,
      enablephotoswipe: false,
      model: undefined
    },

    className: "media",
    template: _.template(Template),

    afterRender: function() {
      if(this.options.enablephotoswipe) {
        this.$el.find(".images li a").photoSwipe();
      }
    }

  });
});