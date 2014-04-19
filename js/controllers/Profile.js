
angular.module('shinystreets.ProfileCtrl', [])
.controller('ProfileCtrl', function($scope, $rootScope, Authentication) {

  $rootScope.leftButtons = [];
  $rootScope.rightButtons = $rootScope.defaultRightButtons();

  $scope.logout = function(){
    Authentication().logout(function(){
      $rootScope.leftButtons = [];
      $rootScope.rightButtons = $rootScope.defaultRightButtons();
    });

    return false;
  };

});
