
angular.module('shinystreets.IssuesCtrl', [])

.controller('IssuesCtrl', function($scope, $rootScope, $ionicLoading, Area, File, Config) {

  $rootScope.leftButtons = $rootScope.defaultLeftButtons();
  $rootScope.rightButtons = $rootScope.defaultRightButtons();

  $scope.title = 'Issues';
  $scope.issues = [];
  $scope.detailLinkPrefix = '/issues';

  $scope.loadError = false;

  $rootScope.$on('modalClose', function(){
    $scope.onRefresh();
  });

  // On pull to refresh
  $scope.onRefresh = function() {

    $scope.loading = $ionicLoading.show({
      content: 'Issues werden geladen...'
    });

    $scope.loadError = false;
    $scope.issues = Area().issues(

      // on success
      function(){
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();

        // load first image for issues
        angular.forEach($scope.issues, function(issue, key){

          issue.photos = File(issue.id).forIssue(

            // on file load success
            function() { },

            // on file load error
            function() { }
          );
        });

      // on error
      }, function(){
        $scope.loadError = true;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
      }
    );
  };

  // Check if we have not already selected an area
  if(!Config.userConfig().activeArea || Config.userConfig().activeArea == -1) {
    $rootScope.openModal('areas');

  // if we have, load the issues
  } else {

    $scope.title = 'Issues aus ' + Config.userConfig().activeAreaName;
    $scope.onRefresh();
  }
});
