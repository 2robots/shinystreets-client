angular.module('shinystreets.GenericResources', ['ngResource'], function($provide){
  $provide.factory('GenericResources', function($resource, Config, Authentication){
    
    // retrun a $resource object with resource name and given methods
    return function(name, methods){
      
      var methods_obj = {};      
      
      methods.forEach(function(method){
        
        if(typeof(method.name) != "undefined") {
        
          // define default values
          var tmp_method = {
            method: 'GET', 
            params: { sub: '' }, 
            isArray: false/*, 
            headers: { 'Authentication': Authentication().httpAuthorization() }*/
          };
          
          // define some values, for key-methods
          if(method.name == "query") {
            tmp_method.params = { id: '', sub: '' };
          }
          
          // allow customization
          if(typeof(method.method) != "undefined") {
            tmp_method.method = method.method;
          }
          
          if(typeof(method.params) != "undefined") {
            tmp_method.params = method.params;
          }
          
          if(typeof(method.isArray) != "undefined") {
            tmp_method.isArray = method.isArray;
          }
          
          if(typeof(method.headers) != "undefined") {
            tmp_method.headers = method.headers;
          }
          
          if(typeof(method.sub) != "undefined") {
            tmp_method.params.sub = method.sub;
          }
          
          // add the method to our methods-object
          methods_obj[method.name] = tmp_method;
        }
      });
      
      // if we have a QUERY method
      if(methods.indexOf("query") != -1) {
        method_obj.query = {
          method: 'GET', 
          params: {
            id: ''
          }, 
          isArray: false/*, 
          headers: { 'Authentication': Authentication.httpAuthorization() }*/
        };
      }
      
      return $resource(Config.endpoint + '/' + name + '/:id/:sub', {}, methods_obj);
    };
  });
});