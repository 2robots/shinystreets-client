
angular.module('shinystreets.UserIssuesCtrl', [])

.controller('UserIssuesCtrl', function($scope, $rootScope, $ionicLoading, $stateParams, User, File, Config) {

  $scope.title = 'Issues';
  $scope.detailLinkPrefix = '/profile/' + $stateParams.userid + '/issues';

  // if this user the current user
  if($stateParams.userid == Config.userConfig().userid) {
    $scope.title = 'Meine Issues';
  } else {

    var user = User($stateParams.userid).get(

      // on user get success
      function() {
        $scope.title = 'Isssues von ' + user.username;
      },

      // on user get error
      function() { }

    );
  }

  $scope.issues = [];

  $scope.loadError = false;

  // On pull to refresh
  $scope.onRefresh = function() {

    $ionicLoading.show();

    $scope.loadError = false;
    $scope.issues = User($stateParams.userid).issues(

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

  $scope.onRefresh();
});
