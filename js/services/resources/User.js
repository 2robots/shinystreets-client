angular.module('shinystreets.User', ['ngResource'], function($provide){

  $provide.factory('User', function(GenericResources){
    return function(id){
      return GenericResources('users', [
        { name: 'me', params: { id: 'me' } },
        { name: 'get', params: { id: id } },
        { name: 'save', method: 'PUT' },
        { name: 'create', method: 'POST' },
        { name: 'issues', params: {
          id: id,
          sub: 'issues'
          }
        }
      ]);
    }
  });
});
