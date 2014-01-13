angular.module('shinystreets.Authentication', [], function($provide){
  $provide.factory('Authentication', function($http, Config){
    return function() {
      
      // Our Authentication object
      var Authentication = {
        
        // The localStorage key to store the token 
        localKey: Config.name + '.AuthToken',
        
        // The server endpoint where we can login 
        loginEndpoint: Config.endpoint + '/login',
        
        // Current token, if we are loggedin 
        token: null, 
        
        /**
         * Initialize the Auth object.
         */
        init: function(){
          
          // load token from localstorage, if avaiable
          this.load();
          
          return this;
        }, 
        
        /**
         * Login to shinystreets-server with username and password. When 
         * successful, will get a token in server response and save it to local
         * storage. 
         *  
         * @param string username
         * @param string password
         * @param function callback
         */
        login: function(username, password, callback) {
          
          // Send request to server
          $http({
            method: 'GET', 
            url: loginEndpoint
          
          // on success
          }).success(function(data, status, headers, config){
            
            // save the token to localstorage
            this.token = data;
            
            // call callback with token and success status.
            callback({
              token: this.token, 
              status: status
            });
            
          // on error
          }).error(function(data, status, headers, config){
            
            // call callback with no token and error status.
            callback({
              token: null, 
              status: status
            });
            
          });
          
          return this; 
        }, 
        
        /**
         * return true, if there is a token
         */
        loggedin: function() {
          this.load();
          return (this.token != null);
        }, 
        
        /**
         * Return a well formated value for the HTTP Authorization field. Will
         * return an empty string, if token is not avaiable. 
         */
        httpAuthorization: function() {
          this.load();
          if(this.token == null) {
            return "";
          } else {
            return "Token " + this.token;
          }
        }, 
        
        /**
         * save the current token to localStorage if not null.
         */
        save: function() {
          if(this.token != null) {
            window.localStorage.setItem(this.localKey, this.token);
            return true;
          } else {
            return false;
          }
        }, 
        
        /**
         * load the current token form localStorage if not null.
         */
        load: function() {
          var token = window.localStorage.getItem(this.localKey);
          
          if(token != null) {
            this.token = token;
            return true;
          } else {
            return false;
          }
        }
      };
      
      // return a new initialized Auth object
      return Authentication.init();
    };
  });
});