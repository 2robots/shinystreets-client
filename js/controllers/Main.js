
angular.module('shinystreets.MainCtrl', [])

.controller('MainCtrl', function($scope, $rootScope, $ionicModal, Authentication, Config, storage, $state) {

  // bind user config to rootScope
  storage.bind(
    $rootScope,
    'userConfig',
    {
      defaultValue: {
        activeArea: -1
      },
      storeName: Config.name + '_UserConfig'
    }
  );

  $rootScope.leftButtonText = function(){
    return 'Areas';
  };

  $rootScope.leftButtonClick = function(){
    $rootScope.openModal("areas");
  };

  $rootScope.isWelcomeState = function(){
    if($state.current.name == 'welcome') {
      return true;
    }

    return false;
  };

  $rootScope.isRootState = function(){
    if($state.current.name == 'tabs.issues' || $state.current.name == 'tabs.map') {
      return true;
    }

    return false;
  };

  $rootScope.loggedin = function(){
    return Authentication().loggedin();
  };

  /**
   * Define all Modals. Modals must be named [NAME]Modal, so the generic open
   * and close methods will work. They can be called by openModal([NAME]) and
   * closeModal().
   */


  /**
   * Open Modal with [name]. Will close any open Modal as well.
   * @param String name
   */
  $rootScope.openModal = function(name) {

    // close an posible open modal
    $rootScope.closeModal();

    // create the modal    
    $ionicModal.fromTemplateUrl(
      'templates/modals/' + name + '.html', {
        scope: $scope, 
        animation: 'slide-in-up'
      }).then(function(modal){
        $rootScope.currentModal = modal;
        $rootScope.currentModal.show();
      }
    );

  };

  /**
   * Close current open Modal
   */
  $rootScope.closeModal = function() {

    // if there is an open modal
    if($rootScope.currentModal != null) {

      // close the modal & unsert currentModal
      $rootScope.currentModal.remove();
      delete $rootScope.currentModal;
    }
  };

});
