angular.module('shinystreets.Issue', ['ngResource'], function($provide){
  $provide.factory('Issue', function(GenericResources){
    return GenericResources('issues', [
      { name: 'get' }
    ]);
  });
});