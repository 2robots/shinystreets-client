
angular.module('shinystreets.IssueCtrl', [])

.controller('IssueCtrl', function($scope, $rootScope, $stateParams, Issue, $ionicNavBarDelegate) {

  $scope.issue = {
    title: 'Untitled Issue',
    description: '',
    solved: false,
    location: undefined
  };

  $scope.issue = Issue($stateParams.id).get(

    // on success
    function(){

      /**
       * MOCK ISSUE ATTRIBUTES. 
       */

      // BIB
      if($scope.issue.id == '5475c54b3bec3d392918fe07') {

        /**
         * NEW
         * SOLUTIONS
         * SOLVED
         * IMPLEMENTING
         * CLOSED
         */
        $scope.issue.stauts = 'SOLUTIONS';
        $scope.issue.mine = false;

        $scope.issue.solutions = [
          {
            creator: {
              id: '54611d88a8ef065a721b1a1c', 
              username: 'tina'
            }, 
            id: 1,
            title: 'Rampe', 
            description: 'Mein Vorschlag: Die Bibliothek könnte die Stufe abflachen oder eine Rampe davor bauen. Dann können alle Menschen mit Rollstuhl die Bibliothek benützen.', 
            positive: 26, 
            negative: 3,
            ratio: 10.34, 
            liked: true,
            disliked: false,
            comments: [
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'Anna'
                }, 
                description: 'Ich bin morgen eh bei der Gemeinde und könnte das dort mal anbringen.'
              }, 
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'tina'
                }, 
                description: 'Sehr cool'
              }, 
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'Anna'
                }, 
                description: '@ersteller, kannst du die Lösung akzeptieren? Dann würden wir beide Punkte bekommen.'
              }, 
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'Anna'
                }, 
                description: '@ersteller ?!?!'
              }
            ]
          }, 





          {
            creator: {
              id: '54611d88a8ef065a721b1a1c', 
              username: 'Franz'
            }, 
            id: 2,
            title: 'Lift bauen', 
            description: 'Die Bib im 16. soll einen Hebelift bauen. Mit dessen Hilfe können alle Menschen im Rollstuhl einfach und sicher die Bibliothek betreten.', 
            positive: 6, 
            negative: 8, 
            ratio: 57.14,
            liked: false,
            disliked: true,
            comments: [
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'tina'
                }, 
                description: 'Da bräuchten wir erstmal Angebote...'
              }, 
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'Anna'
                }, 
                description: 'Das zahlt sich überhaupt nicht aus, es geht ja nur um eine Stufe, keine ganze Stiege.'
              }
            ]
          },





          {
            creator: {
              id: '54611d88a8ef065a721b1a1c', 
              username: 'Oswald'
            }, 
            id: 3,
            title: 'Hintereinang öffentlich machen', 
            description: 'Wenn vor den Eingang noch eine Stufe oder Ähnliches gebaut wird, ist auf dem Gehsteig davor kein Platz mehr, und es können erst wieder keine Rollstuhlfahrer vorbeifahren. Deshalb würde ich den Hintereinang, der eh barrierefrei ist, einfach öffentlich zugänglich machen.', 
            positive: 6, 
            negative: 8, 
            ratio: 57.14,
            liked: false,
            disliked: false,
            comments: [
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'tina'
                }, 
                description: 'Ja, stimmt, das find ich gut.'
              }, 
              {
                creator: {
                  id: '54611d88a8ef065a721b1a1c', 
                  username: 'Anna'
                }, 
                description: 'Na ob das Personal das gut finden würde...'
              }
            ]
          }
        ];

      }

      // BAUSTELLE
      if($scope.issue.id == '547f28b833649d4b754e1b8f') {

        /**
         * NEW
         * SOLUTIONS
         * SOLVED
         * IMPLEMENTING
         * CLOSED
         */
        $scope.issue.stauts = 'NEW';
        $scope.issue.mine = true;

        $scope.issue.comments = [
          {
            creator: {
              id: '54611d88a8ef065a721b1a1c', 
              username: 'tina'
            }, 
            description: 'Ich glaube, die Baustelle selber ist nicht so das Problem, sondern, dass die Leute nicht informiert darüber sind...'
          }, 
          {
            creator: {
              id: '54611d88a8ef065a721b1a1c', 
              username: 'Franz'
            }, 
            description: 'Stimmt! Vielleicht sollte es ein Umleitungsschild oder so geben?'
          }
        ];
      }

      // init leaflet map
      if($rootScope.maps['issue-detail-map'] != undefined) { 
        $rootScope.maps['issue-detail-map'].remove();
      }
      
      $rootScope.maps['issue-detail-map'] = L.map('issue-detail-map', { zoomControl:false });

      // create an OpenStreetMap tile layer
      var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        detectRetina: true
      });

      osmLayer.addTo($rootScope.maps['issue-detail-map']);

      // create layergroup for this map
      var layergroup = L.layerGroup([]);

      // add layergroup to map
      layergroup.addTo($rootScope.maps['issue-detail-map']);

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

      $rootScope.maps['issue-detail-map'].setView([0, 0], 15);
      $rootScope.maps['issue-detail-map'].setView([$scope.issue.latitude, $scope.issue.longitude], 15);

      // save reference to current issue
      $rootScope.currentIssue = $scope.issue;

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
        //alert("FileTransfer not supported!");
      }


    // on error
    }, function(){
      $scope.loadError = true;
    }
  );

  $scope.openFile = function(url) {

    // if FileViewerPlugin is supported
    if(typeof(FileViewerPlugin) != 'undefined') {

      // Open file
      FileViewerPlugin.view(
        // file url (local)
        {url: url},

        // success cb
        function(){

        // error cb
        }, function(){
          //alert("There was an error, opening the file.");
        });
    } else {
      //alert("FileViewerPlugin not supported");
    }
  };

});
