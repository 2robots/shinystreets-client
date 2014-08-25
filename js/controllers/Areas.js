
angular.module('shinystreets.AreasCtrl', [])

.controller('AreasCtrl', function($scope, Area) {

  $scope.areas = Area().query(function(){
  }, function(){
    $scope.loadError = true;
  });

  $scope.loadError = false;

  // On pull to refresh
  $scope.onRefresh = function() {
    $scope.areas = Area().query(
      // on success
      function(){
        $scope.loadError = false;
        $scope.$broadcast('scroll.refreshComplete');

      // on error
      }, function(){
        $scope.loadError = true;
        $scope.$broadcast('scroll.refreshComplete');
      }
    );
  };
});
