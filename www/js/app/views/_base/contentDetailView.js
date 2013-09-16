define(['views/_base/contentView'], function(contentView) {
  return contentView.extend({

    _render: function() {
      this.$el.html(this.template(this.options));
    }

  });
});