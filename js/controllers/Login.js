
angular.module('shinystreets.LoginCtrl', [])

.controller('LoginCtrl', function($scope, $rootScope, Authentication, $ionicLoading, $ionicPopup, $state) {

  $scope.user = {
    username: '',
    password: ''
  };

  $scope.login = function() {

    $ionicLoading.show();

    // Try to Login and to get the token
    Authentication().login(
      $scope.user.username,
      $scope.user.username,
      $scope.user.password,

      function(result){

        if(result.status == 500) {

          $ionicPopup.alert({
            title: 'Server-Fehler'
          });
        }

        if(result.status == 404) {

          $ionicPopup.alert({
            title: 'Emailadresse und/oder Passwort sind nicht korrekt!'
          });
        }

        if(result.status == 200) {

          $rootScope.$broadcast("loggedin");

          setTimeout(function(){
            $scope.closeLogin();
            $ionicLoading.hide();
            $state.go('tabs.profile'); 
          }, 100);

        } else {
          $ionicLoading.hide();
        }
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
