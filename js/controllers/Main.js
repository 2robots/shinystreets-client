
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

  $rootScope.leftButtons = [];
  $rootScope.defaultLeftButtons = function(){
    return [
      {
        content: 'Areas',
        tap: function(e) {
          $rootScope.openModal("areas");
        }
      }
    ];
  };

  $rootScope.rightButtons = [];
  $rootScope.defaultRightButtons = function(){
    if(Authentication().loggedin()) {
      return [
        {
          content: 'Neu',
          tap: function(e) {
            $rootScope.openModal("createIssue");
          }
        }
      ];
    } else {
      return [
        {
          content: 'Login',
          tap: function(e) {
            $rootScope.openModal("login");
          }
        }
      ];
    }
  };

  $rootScope.loggedin = function(){
    return Authentication().loggedin();
  };


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

  // CREATE ISSUE MODAL
  $ionicModal.fromTemplateUrl('templates/modals/createIssue.html', function(modal) {
    $rootScope.createIssueModal = modal;
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
      $rootScope.$broadcast('modalClose');
      $rootScope.currentModal = null;
    }
  };

});
