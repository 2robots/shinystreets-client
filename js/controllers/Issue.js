
angular.module('shinystreets.IssueCtrl', [])

.controller('IssueCtrl', function($scope, $rootScope) {
  
  $scope.leftButtons = [];
  $scope.rightButtons = $rootScope.rightButtons;
  
});