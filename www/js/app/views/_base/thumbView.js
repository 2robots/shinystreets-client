define(['views/_base/view', 'text!templates/_base/blank.tpl'], function(view, Template) {
  return view.extend({

    className: "thumb",
    template: _.template(Template),

    afterInitialize: function() {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "change", this.afterRender);
    },

    afterRender: function() {
      if(this.model.get("is_new")) {
        this.$el.addClass("new");
      } else {
        this.$el.removeClass("new");
      }
    }
  });
});