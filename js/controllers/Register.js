
angular.module('shinystreets.RegisterCtrl', [])

.controller('RegisterCtrl', function($scope, $rootScope, Authentication) {

  $scope.user = {
    username: '',
    password: ''
  };

  $scope.register = function() {

    // Try to Login and to get the token
    Authentication().register(
      $scope.user.username,
      $scope.user.password,

      function(result){

        if(result.status == 500) {
          alert("Server-Fehler!");
        }

        if(result.status == 200) {
          $scope.closeRegister();
        }

        $rootScope.rightButtons = $rootScope.defaultRightButtons();

      }
    );
  };

  $scope.closeRegister = function(){
    $scope.user = {
      username: '',
      password: ''
    };

    $rootScope.closeModal();
  };
});
