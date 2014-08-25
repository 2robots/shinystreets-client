angular.module('shinystreets.Issue', ['ngResource'], function($provide){
  $provide.factory('Issue', function(GenericResources){
    return function(){
      return GenericResources('issues', [
        { name: 'get' },
        { name: 'create', method: 'POST' }
      ]);
    }
  });
});
