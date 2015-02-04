
angular.module('shinystreets.CreateCommentCtrl', [])

.controller('CreateCommentCtrl', function($scope, $rootScope, $ionicActionSheet, $ionicLoading, $ionicPopup, FileUploader) {

  $scope.comment = {
    description: ''
  };

  $ionicLoading.show();
  $ionicLoading.hide();

  $scope.create = function() {

    $ionicLoading.show();

    setTimeout(function(){
      $ionicLoading.hide();
      $scope.closeCreateComment();
    }, 1000);

    /*new Issue().create($scope.issue,

      // ON SUCCESS
      function(response){

        $ionicLoading.hide();

        // if we have an id continue
        if(response.id) {

          // if we have selected at least one foto, we need to upload themn
          if($scope.photos.length > 0) {

            // // let's upload the photos
            var uploader = new FileUploader($scope.photos, response.id,

              // success callback
              function(){

                $ionicLoading.hide();

                $ionicPopup.alert({
                  title: 'Issue wurde erfolgreich erstellt!'
                });

                $scope.closeCreateIssue();

              // error callback
              }, function(){

                $ionicLoading.hide();

                $ionicPopup.alert({
                  title: 'Foto Error!',
                  template: 'Fotos konnten nicht hochgeladen werden!'
                });
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

          $ionicPopup.alert({
            title: 'Issue konnte nicht erstellt werden!',
          });
        }


      // ON ERROR
      }, function(ret){

        $ionicLoading.hide();

        var err = '';

        if(ret.data.error) {
          if(ret.data.error == "E_VALIDATION") {
            err = 'Fehler: ' + ret.data.summary;
          }
        } else {
          err = 'Fehler: ' + ret.data;
        }

        $ionicPopup.alert({
          title: 'Issue konnte nicht erstellt werden!',
          template: err
        });

      }
    );*/
  };

  $scope.closeCreateComment = function(){
    $scope.comment = {};
    $rootScope.closeModal();
  };

});
