
angular.module('shinystreets.WelcomeCtrl', [])

.controller('WelcomeCtrl', function($scope, $rootScope, $state, Config) {

  $scope.login = function(){
    Config.saveUserConfig('opened', true);
    $scope.close();
    $rootScope.openModal('login');
  };

  $scope.register = function(){
    Config.saveUserConfig('opened', true);
    $scope.close();
    $rootScope.openModal('register');
  };

  $scope.close = function() {
    $state.go('tabs.issues');
  }

});
