
angular.module('shinystreets.AreasCtrl', [])

.controller('AreasCtrl', function($scope, $rootScope, Area) {
  $scope.areas = Area.query();
  
  console.log($scope.areas);
});