
angular.module('shinystreets.MapCtrl', [])
.controller('MapCtrl', function($scope, $rootScope) {
  
  $scope.leftButtons = $rootScope.leftButtons;
  $scope.rightButtons = $rootScope.rightButtons;
  
});