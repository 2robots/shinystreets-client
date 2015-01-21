
angular.module('shinystreets.MapCtrl', [])
.controller('MapCtrl', function($scope, $rootScope, Area, Config, $ionicLoading, $location) {

  // init leaflet map
  $scope.map = L.map('map', { zoomControl:false });

  // create an OpenStreetMap tile layer
  var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    detectRetina: true
  });
  osmLayer.addTo($scope.map);

  // create layergroup for this map
  var layergroup = L.layerGroup([]);

  // add layergroup to map
  layergroup.addTo($scope.map);

  // create icon
  var issueIcon = L.icon({
    iconUrl: 'lib/leaflet/images/marker-icon.png',
    iconRetinaUrl: 'lib/leaflet/images/marker-icon-2x.png',
    shadowUrl: 'lib/leaflet/images/marker-shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [12, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 20],  // the same for the shadow
    popupAnchor:  [-1, -26] // point from which the popup should open relative to the iconAnchor
  });

  // on refresh recreatemap
  $scope.onRefresh = function(){

    $ionicLoading.show();

    $scope.issues = Area().issues(

    function(){

      if(typeof(navigator.geolocation) != 'undefined') {
        navigator.geolocation.getCurrentPosition(
          // on success
          function(position){
            // locate current position
            $scope.map.setView([position.coords.latitude, position.coords.longitude], 15);
          }
        );
      }

      $scope.map.on("load", function(e){

        // remove markers
        layergroup.clearLayers();

        // add markers to layergroup
        $scope.issues.forEach(function(issue, key){
          layergroup.addLayer(
            L.marker([
              issue.latitude,
              issue.longitude
            ], {icon: issueIcon})

            //.bindPopup('<a ng-href="#/tabs/issues/' + issue.id + '">' + issue.title + '</a>')
            .on('click', function(){
              $rootScope.$apply(function() {
                $location.path('/tabs/issues');
                setTimeout(function(){
                  $location.path('/tabs/issues/' + issue.id);
                });
              });
            })
          );


          // hide on last
          if(key +1 == $scope.issues.length) {
            $ionicLoading.hide();
          }

        });

        if($scope.issues.length == 0) {
          $ionicLoading.hide();
        }
      });


    }, function(){
      $ionicLoading.hide();
      $scope.loadError = true;
    });
  };


  // add icons from current issues to the map
  // Check if we have already selected an area
  if(!Config.userConfig().activeArea) {
    $rootScope.openModal('areas');
  } else {
    $scope.onRefresh();
  }

  $rootScope.$on('modalClose', function(){
    $scope.onRefresh();
  });
});
