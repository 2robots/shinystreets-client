/* set up require.js with all the paths */
requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    views: '../app/views',
    templates: '../app/templates',
    models: '../app/models',
    collections: '../app/collections'
  }
});

require(['jquery', 'underscore', 'fastclick', 'views/base/mainView'], function(jquery, underscore, Fastclick, mainView){

  jQuery(document).ready(function(){
    $(document).on("deviceready", function(){

      // enable Fastclick plugin
      FastClick.attach(document.body);

      // require main view
      window.app = new mainView;

      // render app
      $("body").append(window.app.render().$el);
      window.app.afterRender();

    });

    // invoke "deviceready" if there is no event (in a regular browser)
    if(typeof(cordova) == "undefined") {
      $(document).trigger("deviceready");
    }
  });
});



