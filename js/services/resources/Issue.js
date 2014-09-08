angular.module('shinystreets.Issue', ['ngResource'], function($provide){
  $provide.factory('Issue', function(GenericResources){
    return function(id){
      return GenericResources('issues', [
        {
          name: 'get',
          params: {
            id: id
          }
        },
        { name: 'create', method: 'POST' }
      ]);
    }
  });
});
