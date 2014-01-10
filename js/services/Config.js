angular.module('shinystreets.Config', [], function($provide){
  $provide.factory('Config', function(){
    return {
      endpoint: 'http://dev.shinystreets.com'
    };
  });
});