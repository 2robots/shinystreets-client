angular.module('shinystreets.Area', ['ngResource'], function($provide){
  $provide.factory('Area', function(GenericResources, Config, storage){
    return GenericResources('areas', [
      { name: 'query' },
      { name: 'issues', params: {
        id: function(){
          return Config.userConfig().activeArea;
        },
        sub: 'issues'
        }
      }
    ]);
  });
});
