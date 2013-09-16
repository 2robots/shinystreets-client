define(['views/_base/view', 'text!templates/_base/blank.tpl'], function(view, Template) {
  return view.extend({

    className: "thumb",
    template: _.template(Template)

  });
});