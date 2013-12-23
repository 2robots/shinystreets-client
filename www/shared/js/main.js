
window.shinystreets = {

  baseUrl: "http://localhost/shinystreets-client/json",
  defaultDataType: "json",

  registerRoutes: function() {
    shinystreets.app.router.register(":view", {view: "issues"});
    shinystreets.app.router.register(":view/:id", {view: "issue", id: undefined});
  },

  initialize: function() {
    // bind cordova.deviceready to this object
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {

    $(document).ready(function(){
      shinystreets.app = new DevExpress.framework.html.HtmlApplication({
        namespace: shinystreets,
        defaultLayout: "navbar",
        navigation: [
          {
            title: "Issues",
            action: "#issues",
            icon: "map"
          },
          {
            title: "Me",
            action: "#me",
            icon: "user"
          },
          {
            title: "Settings",
            action: "#settings",
            icon: "preferences"
          }
        ]
      });

      //Switch to the iOS theme
      var devices = DevExpress.devices,
          iosVersion = devices.iosVersion();
      if(devices.current().platform === "ios" && iosVersion && iosVersion[0] === 7)  {
          $(".dx-viewport")
              .removeClass("dx-theme-ios")
              .addClass("dx-theme-ios7");
      }

      shinystreets.registerRoutes();
      shinystreets.app.navigate();
    });
  }
};

shinystreets.initialize();