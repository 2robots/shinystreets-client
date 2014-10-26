
angular.module('shinystreets.RegisterCtrl', [])

.controller('RegisterCtrl', function($scope, $rootScope, Authentication, $ionicLoading, $ionicPopup) {

  $scope.user = {
    email: '',
    username: '',
    password: '',
    repeat_password: '',
    bio: ''
  };

  $scope.register = function() {

    $ionicLoading.show();

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

                  $ionicPopup.alert({
                    title: 'Server-Fehler!'
                  });

                // on server error
                } else {
                  
                  $ionicPopup.alert({
                    title: 'Server-Fehler!'
                  });

                }
              }
            );

          } else if(result.status == 400) {

            $ionicPopup.alert({
              title: 'Registrierung fehlgeschlagen!', 
              template: 'Fehler: ' + result.data.summary
            });


          // on server error
          } else {
            
            $ionicPopup.alert({
              title: 'Server-Fehler!'
            });
          }
        }
      );
    } else {

      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Passwort ungültig!',
        template: 'Bitte gib zweimal das selbe Passwort ein.'
      });
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
