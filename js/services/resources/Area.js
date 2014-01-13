angular.module('shinystreets.Area', ['ngResource'], function($provide){
  $provide.factory('Area', function(GenericResources, Config){
    return GenericResources('areas', [
      { name: 'query' }, 
      { name: 'issues', params: {
        id: function(){
          return window.localStorage.getItem(Config.name + '.Area');
        }, 
        sub: 'issues'
        }
      }
    ]);
  });
});