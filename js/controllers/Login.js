
angular.module('shinystreets.LoginCtrl', [])

.controller('LoginCtrl', function($scope, $rootScope, Authentication) {

  $scope.user = {
    username: '',
    password: ''
  };

  $scope.login = function() {

    // Try to Login and to get the token
    Authentication().login(
      $scope.user.username,
      $scope.user.username,
      $scope.user.password,

      function(result){

        if(result.status == 500) {
          alert("Server-Fehler!");
        }

        if(result.status == 404) {
          alert("Emailadresse und/oder Passwort sind nicht korrekt!");
        }

        if(result.status == 200) {
          $scope.closeLogin();
        }

        $rootScope.rightButtons = $rootScope.defaultRightButtons();

      }
    );
  };

  $scope.closeLogin = function(){
    $scope.user = {
      username: $scope.user.username,
      password: ''
    };

    $rootScope.closeModal();
  };
});
