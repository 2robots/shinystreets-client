
angular.module('shinystreets.WelcomeCtrl', [])

.controller('WelcomeCtrl', function($scope, $rootScope, $state, Config) {

  $scope.login = function(){
    $scope.close();
    $rootScope.openModal('login');
  };

  $scope.register = function(){
    $scope.close();
    $rootScope.openModal('register');
  };

  $scope.close = function() {
    Config.saveUserConfig('opened', true);
    $state.go('tabs.issues');
  }

});
