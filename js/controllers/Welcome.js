
angular.module('shinystreets.WelcomeCtrl', [])

.controller('WelcomeCtrl', function($scope, $rootScope, Config, $state) {

  $scope.login = function(){
    $rootScope.openModal('login');
    Config.saveUserConfig('opened', true);
  };

  $scope.register = function(){    
    $rootScope.openModal('register');
    Config.saveUserConfig('opened', true);
  };

  $scope.close = function() {
    Config.saveUserConfig('opened', true);
    $state.go('tabs.issues'); 
  }

});
