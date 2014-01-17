
angular.module('shinystreets.CommentsCtrl', [])

.controller('CommentsCtrl', function($scope, $rootScope) {
 
  $scope.rightButtons = $rootScope.rightButtons;
  
  
  // On pull to refresh
  $scope.onRefresh = function() {
  };
});