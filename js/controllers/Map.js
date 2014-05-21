
angular.module('shinystreets.MapCtrl', [])
.controller('MapCtrl', function($scope, $rootScope) {

  $rootScope.leftButtons = $rootScope.defaultLeftButtons();
  $rootScope.rightButtons = $rootScope.defaultRightButtons();


  // init leaflet map
  $scope.map = L.map('map', { zoomControl:false });

  // create an OpenStreetMap tile layer
  var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });
  osmLayer.addTo($scope.map);

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
        $scope.map.setView([position.coords.latitude, position.coords.longitude], 15);
      }
    );
  }


  // add icons from current issues to the map
  // @TODO
  L.marker([48.198655, 16.368463], {icon: issueIcon}).addTo($scope.map).bindPopup("I am a green leaf.");
});
