define(['models/routes/route'], function(route) {
  return route.extend({
    defaults: {
      name: "home",
      key: 'area/listView',
    },

    beforeTo: function() {
      this.set("model", this.collection.app.config.get("default_area"));
    }
  });
});