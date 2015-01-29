
angular.module('shinystreets.IssuesCtrl', [])

.controller('IssuesCtrl', function($scope, $rootScope, Area, File, Config) {

  $scope.title = 'Issues';
  $scope.issues = [];
  $scope.detailLinkPrefix = '/issues';

  $scope.loadError = false;

  $rootScope.$on('modalClose', function(){
    $scope.onRefresh();
  });

  // On pull to refresh
  $scope.onRefresh = function() {

    $scope.loadError = false;
    $scope.issues = Area().issues(

      // on success
      function(){

        // load issues images
        var loadIssueImage = function(issues, key) {
          if($scope.issues.length > key) {
            var issue = $scope.issues[key];

            issue.photos = File(issue.id).forIssue(

            // on file load success
            function() {

              // load next foto
              loadIssueImage($scope.issues, key+1);

            },

            // on file load error
            function() {

              $scope.loadError = true;

              // load next foto
              loadIssueImage(issues, key+1);
            });

          // if there are no more issues in the queue
          } else {

            $scope.$broadcast('scroll.refreshComplete');

            return true;
          }
        };

        loadIssueImage($scope.issues, 0);

      // on error
      }, function(){
        $scope.loadError = true;
        $scope.$broadcast('scroll.refreshComplete');
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

  $scope.$on("areaChanged", function(){
    $scope.title = 'Issues aus ' + Config.userConfig().activeAreaName;
    $scope.onRefresh();
  });

});
