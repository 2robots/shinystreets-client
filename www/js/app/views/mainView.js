define(['models/config', 'collections/areas', 'collections/issues', 'collections/routes', 'backbone'], function(config, areas, issues, routes) {
  return Backbone.View.extend({

    id: 'main',
    currentView: undefined,
    lastView: undefined,
    config: undefined,

    initialize: function() {

      // create config
      this.config = new config({}, this);

      // create areas collection
      this.areas = new areas([], this);
      this.areas.fetch();

      // create issues collection
      this.issues = new issues([], this);
      this.issues.fetch();

      // init test config
      this.config.set("default_area", this.areas.first());

      // create routes
      this.routes = new routes([], this);
      this.routes.fetch();
    },

    render: function() {
      this.$el.html();
      return this;
    },

    afterRender: function() {

      // open issues View on start
      this.routes.to("home");
    },

    scrollPosition: function() {
      if(typeof(this.currentView) != "undefined") {
        return this.currentView.content.scroll.y;
      } else {
        return 0;
      }
    },

    openView: function(key, model, transition, options, scrollPosition) {

      var t = this;

      if(typeof(scrollPosition) == "undefined") {
        scrollPosition = 0;
      }

      // try to load the view and do the transition
      try {
        require(['views/' + key], function(view){

          // save old view
          t.lastView = t.currentView;

          // allow to add aditional options
          var view_options = _.extend({app: t, model: model, startY: scrollPosition}, options);

          // create new View
          t.currentView = new view(view_options);

          // append new View to content
          t.$el.append(t.currentView.render().$el);

          switch(transition) {

            // navigate right
            case "slideRight":
              setTimeout(function(){
                t.lastView.$el.addClass("pt-page-moveToLeft");
                t.currentView.$el.addClass("pt-page-moveFromRight");

                // make this page the current page
                t.currentView.$el.addClass("pt-page-current");

                setTimeout(function(){
                  t.currentView.$el.removeClass("pt-page-moveFromRight");
                  t.lastView.remove();
                  t.currentView.afterRender();
                }, 410);
              });
              break;

            // navigate left
            case "slideLeft":
              setTimeout(function(){
                t.lastView.$el.addClass("pt-page-moveToRight");
                t.currentView.$el.addClass("pt-page-moveFromLeft");

                // make this page the current page
                t.currentView.$el.addClass("pt-page-current");

                setTimeout(function(){
                  t.currentView.$el.removeClass("pt-page-moveFromLeft");
                  t.lastView.remove();
                  t.currentView.afterRender();
                }, 410);
              });
              break;

            // default: just place the new page
            default:

              if(typeof(t.lastView) != "undefined") {
                t.lastView.remove();
              }

              // make this page the current page
              t.currentView.$el.addClass("pt-page-current");

              t.currentView.afterRender();

              break;
          }
        });

        return true;
      } catch(error) {
        return false;
      }

    }

  });
});