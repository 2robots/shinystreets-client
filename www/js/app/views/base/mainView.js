define(['backbone'], function() {
  return Backbone.View.extend({

    id: 'main',
    currentView: undefined,
    lastView: undefined,

    render: function() {
      this.$el.html();
      return this;
    },

    afterRender: function() {

      // open issues View
      this.openView('listViews/issuesView');

    },

    openView: function(key, transition) {

      var t = this;

      // try to load the view and do the transition
      try {
        require(['views/' + key], function(view){

          // save old view
          t.lastView = t.currentView;

          // create new View
          t.currentView = new view();

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