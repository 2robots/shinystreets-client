
angular.module('shinystreets.IssueCtrl', [])

.controller('IssueCtrl', function($scope, $rootScope, $stateParams, $ionicLoading, Issue, $ionicNavBarDelegate) {

  // if we have no back button
  $ionicNavBarDelegate.showBackButton(true);

  $rootScope.leftButtons = [];
  $rootScope.rightButtons = $rootScope.defaultRightButtons();

  // show loading animation
  $ionicLoading.show();

  $scope.issue = {
    title: 'Untitled Issue',
    description: '',
    solved: false,
    location: undefined
  };



  // init leaflet map
  $scope.map = L.map('issue-detail-map', { zoomControl:false });

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



  $scope.issue = Issue($stateParams.id).get(

    // on success
    function(){

      // remove marker
      layergroup.clearLayers();

      // add marker to layergroup
      layergroup.addLayer(
        L.marker([
          $scope.issue.latitude,
          $scope.issue.longitude
        ], {icon: issueIcon})

        .bindPopup('<strong>' + $scope.issue.title + '</strong>')
      );

      $scope.map.setView([$scope.issue.latitude, $scope.issue.longitude], 15);
      $ionicLoading.hide();


      // download files
      if(typeof(FileTransfer) != 'undefined') {

        window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function (fileSystem) {

          $scope.issue.photos.forEach(function(photo, key){

            var photo_url = photo.url.substr(8).replace("/", "_");
            var fileTransfer = new FileTransfer();
            fileTransfer.download(
              photo.url, 
              fileSystem.root.toURL() + photo_url, 

              function(entry) {
                $scope.issue.photos[key].nativeURL = entry.toURL();
              }
            );

          });

        });

      } else {
        alert("FileTransfer not supported!");
      }


    // on error
    }, function(){

      $ionicLoading.hide();
      $scope.loadError = true;
    }
  );

  $scope.openFile = function(url) {

    $ionicLoading.hide();

    // if FileViewerPlugin is supported
    if(typeof(FileViewerPlugin) != 'undefined') {

      // Open file
      FileViewerPlugin.view(
        // file url (local)
        {url: url},

        // success cb
        function(){
          $ionicLoading.hide();

        // error cb
        }, function(){
          $ionicLoading.hide();
          alert("There was an error, opening the file.");
        });
    } else {
      alert("FileViewerPlugin not supported");
    }
  };

});
