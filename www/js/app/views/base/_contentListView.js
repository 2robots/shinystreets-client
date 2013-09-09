define(['views/base/_contentView'], function(_contentView) {
  return _contentView.extend({

    list_parent: undefined,

    _render: function() {
      this.$el.html(this.template(this.options));
      this.list_parent = this.$el.children(".list");

      // append children
      // TODO
    }

  });
});