
angular.module('shinystreets.AreasCtrl', [])

.controller('AreasCtrl', function($rootScope, $scope, Area, Config) {

  $scope.loadError = false;

  // On pull to refresh
  $scope.onRefresh = function() {

    $scope.areas = Area().query(
      // on success
      function(){
        $scope.loadError = false;
        $scope.$broadcast('scroll.refreshComplete');

      // on error
      }, function(){
        $scope.loadError = true;
        $scope.$broadcast('scroll.refreshComplete');
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
