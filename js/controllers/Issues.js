
angular.module('shinystreets.IssuesCtrl', [])

.controller('IssuesCtrl', function($scope, $rootScope, Area) {
  
  $scope.issues = Area.issues();
  $scope.loadError = false;
  
  // On pull to refresh
  $scope.onRefresh = function() {
    $scope.loadError = false;
    
    $scope.issues = Area.issues(
      // on success
      function(){
        $scope.$broadcast('scroll.refreshComplete');
        
      // on error
      }, function(){
        $scope.loadError = true;
        $scope.$broadcast('scroll.refreshComplete');
      }
    );
  };
});