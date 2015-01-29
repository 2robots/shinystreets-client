
angular.module('shinystreets.MainCtrl', [])

.controller('MainCtrl', function($scope, $rootScope, $ionicModal, $ionicActionSheet, Authentication, Config, storage, $state) {

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


  $rootScope.openCreateMenu = function(){

    // default buttons
    var buttons = [
      { text: 'Issue', modal: 'createIssue' }
    ];

    // buttons for issue detail view
    if($state.current.name == 'tabs.issue') {
      buttons.push({ text: 'Lösung', modal: 'createSolution' });
    }

    // buttons for solution detail view
    if($state.current.name == 'tabs.solution') {
      buttons.push({ text: 'Lösung', modal: 'createSolution' });
      buttons.push({ text: 'Kommentar', modal: 'createComment' });
    }

    // show sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: buttons, 
      titleText: 'Erstellen',
      cancelText: 'Abbrechen',
      cancel: function(){}, 
      buttonClicked: function(index){
        hideSheet();
        $rootScope.openModal(buttons[index].modal);
      }
    });
  };

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
