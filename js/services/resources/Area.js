angular.module('shinystreets.Area', ['ngResource'], function($provide){
  $provide.factory('Area', function($resource, Config){
    return $resource(Config.endpoint + '/areas/:areaId', {}, {
      query: {
        method:'GET', 
        params:{
          areaId:''
        }, 
        isArray:true
      }
    });
  });
});