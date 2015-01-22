
angular.module('shinystreets.AreasCtrl', [])

.controller('AreasCtrl', function($rootScope, $scope, Area, $ionicLoading, Config) {

  $scope.loadError = false;

  // On pull to refresh
  $scope.onRefresh = function() {

    // show loading
    $ionicLoading.show();

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
      $rootScope.$broadcast("areaChanged");
      $rootScope.closeModal();
    }, 10);
  };

  // on init refresh
  $scope.$on('modal.shown', function(e) {
    $scope.onRefresh(); 
  });

});
