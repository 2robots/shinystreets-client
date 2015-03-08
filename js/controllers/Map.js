
angular.module('shinystreets.MapCtrl', [])
.controller('MapCtrl', function($scope, $rootScope, Area, Config, $location) {

  // on refresh recreatemap
  $scope.onRefresh = function(){

    // init leaflet map
    if($rootScope.maps['map'] != undefined) { 
      $rootScope.maps['map'].remove();
    }

    $rootScope.maps['map'] = L.map('map', { zoomControl:false });
    // create an OpenStreetMap tile layer
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      detectRetina: true
    });
    osmLayer.addTo($rootScope.maps['map']);

    $scope.issues = Area().issues(

    function(){

      // create layergroup for this map
      var layergroup = L.layerGroup([]);

      // add layergroup to map
      layergroup.addTo($rootScope.maps['map']);

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

      if(typeof(navigator.geolocation) != 'undefined') {
        navigator.geolocation.getCurrentPosition(
          // on success
          function(position){
            // locate current position
            $rootScope.maps['map'].setView([0, 0], 12);
            $rootScope.maps['map'].setView([position.coords.latitude, position.coords.longitude], 12);
          }
        );
      }

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
      });
    }, function(){
      $scope.loadError = true;
    });
  };


  // add icons from current issues to the map
  // Check if we have already selected an area
  if(!Config.userConfig().activeArea) {
    $rootScope.openModal('areas');
  } else {
    $scope.title = 'Issues aus ' + Config.userConfig().activeAreaName;
    $scope.onRefresh();
  }

  $rootScope.$on('modalClose', function(){
    $scope.onRefresh();
  });

  $scope.$on("areaChanged", function(){
    $scope.title = 'Issues aus ' + Config.userConfig().activeAreaName;
    $scope.onRefresh();
  });
});
