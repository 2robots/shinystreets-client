angular.module('shinystreets.Issue', ['ngResource'], function($provide){
  $provide.factory('Issue', function(GenericResources){
    return GenericResources('areas', [
      { name: 'get' }
    ]);
  });
});