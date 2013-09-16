define(['views/_base/view', 'text!templates/_base/headerView.tpl'], function(view, Template) {
  return view.extend({

    events: {
      "click .button_left": "left_button_action",
      "click .button_right": "right_button_action"
    },

    className: 'header',
    template: _.template(Template),
    defaults: {
      title: "View",
      buttons: {

      }
    },

    left_button_action: function() {
      if(typeof(this.options.buttons.left) != "undefined") {
        this.options.app.routes.to(this.options.buttons.left);
      }
      return false; // preventDefault + stopProgagation
    },

    right_button_action: function() {
      if(typeof(this.options.buttons.right) != "undefined") {
        this.options.app.routes.to(this.options.buttons.right);
      }
      return false; // preventDefault + stopProgagation
    }

  });
});