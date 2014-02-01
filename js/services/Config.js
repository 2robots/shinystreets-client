angular.module('shinystreets.Config', [], function($provide){
  $provide.factory('Config', function(storage){

    return {
      name: 'shinystreets',
      endpoint: 'http://dev.shinystreets.com',
      //endpoint: 'http://localhost/shinystreets_json',
      userConfig: function() {
        return storage.get(this.name + '_UserConfig');
      }
    };
  });
});
