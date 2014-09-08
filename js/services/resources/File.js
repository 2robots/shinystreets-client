angular.module('shinystreets.File', ['ngResource'], function($provide){
  $provide.factory('File', function(GenericResources){
    return function(issue){
      return GenericResources('files', [
        { name: 'create', method: 'POST' },
        {
          name: 'forIssue',
          method: 'GET',
          params: { parentIssue: issue }
        }
      ]);
    }
  });
});
