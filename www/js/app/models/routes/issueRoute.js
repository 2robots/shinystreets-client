define(['models/routes/route', 'views/issue/detailView'], function(route, detailView) {
  return route.extend({
    defaults: {
      name: "issue",
      key: '_base/baseView',
      transition: "slideRight",
      options: {
        header: {
          buttons: {
            left: "back",
            right: "login"
          }
        },
        content: {
          view: detailView
        }
      }
    },

    beforeTo: function() {
      var opt = this.get("options");

      opt.header.title = this.get("model").get("title");

      this.set("options", opt);
    }
  });
});