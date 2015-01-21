
angular.module('shinystreets.WelcomeCtrl', [])

.controller('WelcomeCtrl', function($scope, $rootScope, Config) {

  $scope.login = function(){
    $rootScope.openModal('login');
    Config.saveUserConfig('opened', true);
  };

  $scope.register = function(){    
    $rootScope.openModal('register');
    Config.saveUserConfig('opened', true);
  };

  $scope.close = function() {
    $scope.close();
    Config.saveUserConfig('opened', true);
  }

});
