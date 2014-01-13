angular.module('shinystreets.Config', [], function($provide){
  $provide.factory('Config', function(){
    return {
      
      name: 'shinystreets', 
      //endpoint: 'http://dev.shinystreets.com'
      endpoint: 'http://localhost/shinystreets_json'
    };
  });
});