angular.module('shinystreets.Authentication', [], function($provide){
  $provide.factory('Authentication', function($http, Config, storage){
    return function() {

      // Our Authentication object
      var Authentication = {

        // The localStorage key to store the token
        localKey: Config.name + '_AuthToken',

        // The server endpoint where we can login
        loginEndpoint: Config.endpoint + '/users/login',

        // The server endpoint where we can logout
        logoutEndpoint: Config.endpoint + '/users/logout',

        // The server endpoint where we can register a new user
        registerEndpoint: Config.endpoint + '/users',

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
         * Login to shinystreets-server with username (or email) and password. When
         * successful, will get a token in server response and save it to local
         * storage.
         *
         * @param string username
         * @param string email
         * @param string password
         * @param function callback
         */
        login: function(username, email, password, callback) {

          var t = this;

          // Send request to server
          $http.post(
            this.loginEndpoint,
            {
              username: username,
              email: email,
              password: password
            }

          // on success
          ).success(function(data, status, headers, config){

            // save the token to localstorage
            t.token = data.bearer_token;
            t.save();

            // call callback with token and success status.
            callback({
              token: t.token,
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
         * Logout the current user. Will always call callback.
         * @param function callback
         */
        logout: function(callback) {

          this.token = null;
          storage.set(this.localKey, this.token);
          callback();
          return this;
        },

        /**
         * Register a new user. Will always call callback.
         * @param function callback
         */
        register: function(udata, callback) {

          var t = this;

          // Send request to server
          $http.post(
            t.registerEndpoint,
            udata

          // on success
          ).success(function(data, status, headers, config){

            // call callback with user object
            callback({
              user: data,
              status: status
            });

          // on error
          }).error(function(data, status, headers, config){

            // call callback with no user and error status.
            callback({
              user: null,
              status: status, 
              data: data.error
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
            return "Bearer " + this.token;
          }
        },

        /**
         * save the current token to localStorage if not null.
         */
        save: function() {
          if(this.token != null) {
            storage.set(this.localKey, this.token);
            return true;
          } else {
            return false;
          }
        },

        /**
         * load the current token form localStorage if not null.
         */
        load: function() {
          var token = storage.get(this.localKey);

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
