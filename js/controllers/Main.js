
angular.module('shinystreets.MainCtrl', [])

.controller('MainCtrl', function($scope, $rootScope, $ionicModal) {
  
  $rootScope.leftButtons = [
    {
      type: 'button-clear',
      //content: 'Areas<i class="icon ion-navicon"></i>',
      content: 'Areas',
      tap: function(e) {
        $rootScope.openModal("areas");
      }
    }
  ];
  
  $rootScope.rightButtons = [
    {
      type: 'button-clear',
      content: 'Neu',
      tap: function(e) {
        $rootScope.openModal("create");
      }
    }
  ];
  
  
  /**
   * Define all Modals. Modals must be named [NAME]Modal, so the generic open
   * and close methods will work. They can be called by openModal([NAME]) and
   * closeModal().
   */  
  $rootScope.currentModal = null;
  
  // AREAS MODAL
  $ionicModal.fromTemplateUrl('templates/modals/areas.html', function(modal) {
    $rootScope.areasModal = modal;
  }, { scope: $rootScope, animation: 'slide-in-up' });
  
  // LOGIN MODAL
  $ionicModal.fromTemplateUrl('templates/modals/login.html', function(modal) {
    $rootScope.loginModal = modal;
  }, { scope: $rootScope, animation: 'slide-in-up' });
  
  /**
   * Open Modal with [name]. Will close any open Modal as well.  
   * @param String name
   */
  $rootScope.openModal = function(name) {
    
    // if this modal is defined
    if(typeof($rootScope[name + 'Modal']) != 'undefined') {
      
      // close an posible open modal
      $rootScope.closeModal();
      
      // show the new modal & save it as currentModal
      $rootScope[name + 'Modal'].show();
      $rootScope.currentModal = $rootScope[name + 'Modal']; 
    }
  };
  
  /**
   * Close current open Modal
   */
  $rootScope.closeModal = function() {
    
    // if there is an open modal
    if($rootScope.currentModal != null) {
      
      // close the modal & unsert currentModal
      $rootScope.currentModal.hide();
      $rootScope.currentModal = null;
    }
  };
  
});