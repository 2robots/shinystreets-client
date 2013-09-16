define(['views/_base/contentView'], function(contentView) {
  return contentView.extend({

    list_parent: undefined,
    list_items: [],

    _render: function() {
      var t = this;

      // render element
      t.$el.html(t.template(t.options));

      // render list
      t.list_parent = $('<ol />', {class: "list"}).appendTo(t.$el);

      // render items if listItemView is defined
      if(typeof(t.options.listItemView) != "undefined") {

        // render children with myListItemView
        t.options.models.each(function(m) {

          // render listItemView
          cl = new t.options.listItemView({app: t.options.app, model: m});

          // add a new li element
          var li = $("<li />").appendTo(t.list_parent);

          // append listItemView to the new li,
          li.append(cl.render().$el);

          // and add it to list_items
          t.list_items.push(cl);
        });

        myListItemView = t.options.listItemView;
      }
    }
  });
});