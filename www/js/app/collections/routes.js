define([
  'models/routes/route',
  'models/routes/homeRoute',
  'models/routes/backRoute',
  'models/routes/issueRoute',
'backbone'], function(
  route,
  backRoute,
  homeRoute,
  issueRoute
) {

  return Backbone.Collection.extend({
    idAttribute: 'name',
    model: route,
    last: undefined,
    current: undefined,

    initialize: function(models, app) {
      this.app = app;
    },

    fetch: function() {

      // define all named routes

      // HOME
      this.add(new homeRoute({}, this));

      // BACK
      this.add(new backRoute({}, this));

      // ISSUE
      this.add(new issueRoute({}, this));
    },

    to: function(name, model) {
      var route = this.get(name);
      if(typeof(route) != "undefined") {

        if(typeof(model) != "undefined") {
          route.set("model", model);
        }

        this.toRoute(route);
      }
    },

    toRoute: function(route) {
      route.beforeTo();

      this.last = this.current;

      if(typeof(this.last) != "undefined") {
        this.last.set("scrollPosition", this.app.scrollPosition());
      }

      this.current = route;

      this.app.openView(
        route.get("key"),
        route.get("model"),
        route.get("transition"),
        route.get("options"),
        route.get("scrollPosition")
      );

      route.afterTo();
    }
  });
});