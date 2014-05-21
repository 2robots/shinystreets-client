
angular.module('shinystreets.IssueCtrl', [])

.controller('IssueCtrl', function($scope, $rootScope, $stateParams, $ionicLoading, Issue) {

  $rootScope.leftButtons = [];
  $rootScope.rightButtons = $rootScope.defaultRightButtons();

  // show loading animation
  $scope.loading = $ionicLoading.show({
    content: 'Loading'
  });

  $scope.issue = {
    title: 'Untitled Issue',
    description: '',
    solved: false,
    location: undefined
  };

  $scope.issue = Issue.get({id: $stateParams.id}, function(){
    $ionicLoading.hide();
  }, function(){
    $ionicLoading.hide();
    $scope.loadError = true;
  });

});
