
angular.module('shinystreets.RegisterCtrl', [])

.controller('RegisterCtrl', function($scope, $rootScope, Authentication, $ionicLoading) {

  $scope.user = {
    email: '',
    username: '',
    password: '',
    repeat_password: '',
    bio: ''
  };

  $scope.register = function() {

    $ionicLoading.show({
      template: 'Account wird erstellt...'
    });

    // check if passwords match
    if($scope.user.password == $scope.user.repeat_password && $scope.user.password != '') {

      // don't send repeat_password
      $scope.user.repeat_password = undefined;

      // Try to Login and to get the token
      Authentication().register(
        $scope.user,

        function(result){

          $ionicLoading.hide();

          // on server success
          if(result.status == 200) {

            // Login user
            Authentication().login(
              $scope.user.username,
              $scope.user.email,
              $scope.user.password,

              function(result){

                // on server success
                if(result.status == 200) {
                  $scope.closeRegister();
                  $rootScope.rightButtons = $rootScope.defaultRightButtons();

                } else if(result.status == 400) {

                  alert("Die angegeben Daten sind entweder unvollständig oder ungültig.")

                // on server error
                } else {
                  alert("Server-Fehler!");
                }
              }
            );

          // on server error
          } else {
            alert("Server-Fehler!");
          }
        }
      );
    } else {
      alert("Bitte gib zweimal das selbe Passwort ein.");
    }
  };

  $scope.closeRegister = function(){
    $scope.user = {
      email: '',
      username: '',
      password: '',
      repeat_password: '',
      bio: ''
    };
    $rootScope.closeModal();
  };
});
