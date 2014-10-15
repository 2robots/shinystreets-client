
angular.module('shinystreets.CreateIssueCtrl', [])

.controller('CreateIssueCtrl', function($scope, $rootScope, $ionicActionSheet, $ionicLoading, Issue, FileUploader) {

  $scope.issue = {
    title: '',
    description: '',
    latitude: null,
    longitude: null
  };

  //$scope.photos = [{uri: "http://www.2robots.at/img/menu@2x.png"}, {uri: "http://www.2robots.at/img/menu@2x.png"}, {uri: "http://www.2robots.at/img/menu@2x.png"}, {uri: "http://www.2robots.at/img/menu@2x.png"}];
  $scope.photos = [];

  $ionicLoading.show();
  $ionicLoading.hide();

  var marker = null;

  // on shown
  $rootScope.$on('modal.shown', function(e) {
    if($rootScope.currentModal == $rootScope.createIssueModal) {

      // create a map and get current position
      if(typeof(navigator.geolocation) != 'undefined') {
        navigator.geolocation.getCurrentPosition(

          // on success
          function(position){

            // init leaflet map
            $scope.map = L.map('create-issue-map', { zoomControl:false });

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

            marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: issueIcon, draggable: true});
            marker.addTo($scope.map);

            // locate current position
            $scope.map.setView([position.coords.latitude, position.coords.longitude], 15);
            $scope.coords = position.coords;
          },

          // on error
          function(error) {
            alert("Geolocation error.");
            console.log(error);
          }
        );
      }
    }
  });

  $scope.removePhoto = function(index) {
    $scope.photos.splice(index, 1);
  }

  $scope.addPhoto = function() {

    if(typeof(navigator.camera) != 'undefined') {

      // action sheet to select or take a picture
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Photo auswählen' },
          { text: 'Photo aufnehmen' }
        ],
        titleText: 'Füge ein Foto hinzu',
        cancelText: 'Abbrechen',

        // on action sheet button click
        buttonClicked: function(index) {

          // get user selection
          var sourceType = null;

          if(index == 0) {
            sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
          }

          if(index == 1) {
            sourceType = Camera.PictureSourceType.CAMERA;
          }

          // access camera
          navigator.camera.getPicture(

            // ON SUCCESS
            function(imageURI){

              // add photo to scope
              $scope.photos.push({uri: imageURI});
              $scope.$apply();

            // ON ERROR
            }, function(message){
              alert("Beim auswählen des Bildes ist ein Fehler aufgetreten: " + message);

            }, {
              quality: 49,
              sourceType: sourceType,
              destinationType: Camera.DestinationType.FILE_URI,
              allowEdit : true,
              correctOrientation: true,
              popoverOptions: true
            });

          return true;
        }
      });

    } else {
      alert("Dieses Gerät unterstützt keinen Bilder-Upload.");
    }
  }

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

  $scope.create = function() {

    $ionicLoading.show();

    // get selected coordiantes
    if(marker) {
      var coordiantes = marker.getLatLng();
      $scope.issue.latitude = coordiantes.lat;
      $scope.issue.longitude = coordiantes.lng;
    }

    console.log('######################');
    console.log('######################');
    console.log($scope.issue);
    console.log('######################');
    console.log('######################');

    console.log('1');

    new Issue().create($scope.issue,

      // ON SUCCESS
      function(response){

        console.log('SUCCESS 2');

        $ionicLoading.hide();

        // if we have an id continue
        if(response.id) {

          console.log('SUCCESS 3');

          // if we have selected at least one foto, we need to upload themn
          if($scope.photos.length > 0) {

            console.log('SUCCESS 4');

            // // let's upload the photos
            var uploader = new FileUploader($scope.photos, response.id,

              // success callback
              function(){

                console.log('SUCCESS 5');

                $ionicLoading.hide();
                alert("Issue wurde erfolgfeich erstellt!");
                $scope.closeCreateIssue();

              // error callback
              }, function(){

                console.log('ERROR 5');

                $ionicLoading.hide();
                alert("Fotos konnten nicht hochgeladen werden!");

              }
            );

            // if we can create the uploader
            if(typeof(uploader.start) != 'undefined') {
              uploader.start();
            }
          } else {
            $scope.closeCreateIssue();
          }

        } else {
          alert("Issue konnte nicht erstellt weren!");
        }


      // ON ERROR
      }, function(ret){

        console.log('ERROR 2');

        console.log(ret);
        $ionicLoading.hide();
        alert("ERROR creating issue");
      }
    );
  };

  $scope.closeCreateIssue = function(){
    $scope.issue = {
    };
    $rootScope.closeModal();
  };

});