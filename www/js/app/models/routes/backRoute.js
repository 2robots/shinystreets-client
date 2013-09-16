define(['models/routes/route'], function(route) {
  return route.extend({
    defaults: {
      name: "back",
      transition: "slideLeft",
    },

    beforeTo: function() {
      this.set("key", this.collection.last.get("key"));
      this.set("model", this.collection.last.get("model"));
      this.set("scrollPosition", this.collection.last.get("scrollPosition"));
    }
  });
});