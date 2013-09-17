define(['views/_base/view', 'text!templates/issue/metaView.tpl'], function(view, Template) {
  return view.extend({

    defaults: {
      showsolutions: true,
      model: undefined
    },

    className: "meta",
    template: _.template(Template)

  });
});