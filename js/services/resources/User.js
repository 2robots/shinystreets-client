angular.module('shinystreets.User', ['ngResource'], function($provide){
  $provide.factory('User', function($resource, Config){
    return $resource(Config.endpoint + '/users/:userId', {}, {
      me: { method:'GET', params:{ userId:'me' } },
      save: { method:'PUT' },
      create: { method:'POST', params:{ userId:'' } }
    });
  });
});
