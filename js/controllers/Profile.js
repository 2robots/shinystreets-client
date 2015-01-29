
angular.module('shinystreets.ProfileCtrl', [])
.controller('ProfileCtrl', function($scope, $rootScope, Authentication, User, Config) {

  $scope.user = {};
  $scope.loadError = false;

  $scope.logout = function(){
    Authentication().logout(function(){
      $rootScope.leftButtons = [];
      $rootScope.rightButtons = $rootScope.defaultRightButtons();
    });

    return false;
  };

  // On pull to refresh
  $scope.onRefresh = function() {

    $scope.user = User().me(

      // success
      function() {
        $scope.$broadcast('scroll.refreshComplete');

        // save user id + user name
        Config.saveUserConfig('username', $scope.user.username);
        Config.saveUserConfig('userid', $scope.user.id);
        $scope.loadError = false;
      },

      // error
      function() {
        $scope.loadError = true;
        $scope.$broadcast('scroll.refreshComplete');
      }
    );
  };

  $scope.$on("loggedin", function(){
    $scope.onRefresh();    
  });

  $scope.onRefresh();

});
