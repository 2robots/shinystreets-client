define(['models/config', 'collections/areas', 'backbone'], function(config, areas) {
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

      // init test config
      this.config.set("default_area", this.areas.first());
    },

    render: function() {
      this.$el.html();
      return this;
    },

    afterRender: function() {

      // open issues View on start
      this.openView('listViews/areaView', this.config.get("default_area"));

    },

    openView: function(key, model, transition) {

      var t = this;

      // try to load the view and do the transition
      try {
        require(['views/' + key], function(view){

          // save old view
          t.lastView = t.currentView;

          // create new View
          t.currentView = new view({app: t, model: model});

          // append new View to content
          t.$el.append(t.currentView.render().$el);
          t.currentView.afterRender();

          switch(transition) {

            // navigate right
            case "slideRight":
              setTimeout(function(){
                t.lastView.addClass("pt-page-moveToLeft");
                t.currentView.addClass("pt-page-moveFromRight");

                setTimeout(function(){
                  t.currentView.removeClass("pt-page-moveFromRight");
                  t.lastView.remove();
                }, 410);
              });
              break;

            // navigate left
            case "slideLeft":
              setTimeout(function(){
                t.lastView.addClass("pt-page-moveToRight");
                t.currentView.addClass("pt-page-moveFromLeft");

                setTimeout(function(){
                  t.currentView.removeClass("pt-page-moveFromLeft");
                  t.lastView.remove();
                }, 410);
              });
              break;

            // default: just place the new page
            default:

              if(typeof(t.lastView) != "undefined") {
                t.lastView.remove();
              }

              break;
          }

          // make this page the current page
          t.currentView.$el.addClass("pt-page-current");

        });

        return true;
      } catch(error) {
        return false;
      }

    }

  });
});