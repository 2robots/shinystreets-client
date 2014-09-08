
angular.module('shinystreets.AreasCtrl', [])

.controller('AreasCtrl', function($scope, Area, $ionicLoading, Config) {

  $scope.loadError = false;

  // On pull to refresh
  $scope.onRefresh = function() {

    // show loading
    $ionicLoading.show({
      template: "Areas werden geladen..."
    });

    $scope.areas = Area().query(
      // on success
      function(){
        $scope.loadError = false;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();

      // on error
      }, function(){
        $scope.loadError = true;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
      }
    );
  };

  $scope.onChange = function(area) {
    setTimeout(function(){
      Config.saveUserConfig('activeAreaName', area.title);
    }, 10);
  };

  // on init refresh
  $scope.onRefresh();

});
