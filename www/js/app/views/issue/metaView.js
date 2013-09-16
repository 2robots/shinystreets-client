define(['views/_base/view', 'text!templates/issue/metaView.tpl'], function(view, Template) {
  return view.extend({

    className: "meta",
    template: _.template(Template)

  });
});