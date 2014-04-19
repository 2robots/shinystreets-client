
angular.module('shinystreets.IssuesCtrl', [])

.controller('IssuesCtrl', function($scope, $rootScope, $ionicLoading, Area, Config) {

  $rootScope.leftButtons = $rootScope.defaultLeftButtons();
  $rootScope.rightButtons = $rootScope.defaultRightButtons();

  $scope.loading = $ionicLoading.show({
    content: 'Loading'
  });
  $scope.loading.hide();

  $scope.title = 'Issues';
  $scope.issues = [];

  // Check if we have already selected an area
  if(Config.userConfig().activeArea == -1) {
    $rootScope.openModal('areas');
  } else {
    $scope.loading.show();

    $scope.issues = Area.issues(function(){
      $scope.loading.hide();
    }, function(){
      $scope.loading.hide();
      $scope.loadError = true;
    });
  }

  $scope.loadError = false;

  $rootScope.$on('modalClose', function(){
    $scope.onRefresh();
  });

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
