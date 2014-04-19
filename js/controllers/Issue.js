
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
    $scope.loading.hide();
    console.log($scope.issue);
  }, function(){
    $scope.loading.hide();
    $scope.loadError = true;
  });

});
