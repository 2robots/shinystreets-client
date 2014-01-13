
angular.module('shinystreets.AreasCtrl', [])

.controller('AreasCtrl', function($scope, $rootScope, Area) {

  $scope.areas = Area.query();
  
  // On pull to refresh
  $scope.onRefresh = function() {
    $scope.areas = Area.query(
      // on success
      function(){
        $scope.$broadcast('scroll.refreshComplete');
        
      // on error
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      }
    );
  };
});