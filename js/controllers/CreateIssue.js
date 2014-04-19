
angular.module('shinystreets.CreateIssueCtrl', [])

.controller('CreateIssueCtrl', function($scope, $rootScope, Issue) {

  $scope.issue = {
    title: '',
    description: ''
  };

  $scope.create = function() {

    Issue.create($scope.issue,

      // ON SUCCESS
      function(){
        $scope.closeCreateIssue();

      // ON ERROR
      }, function(){
        alert("ERROR");
      }
    );
  };

  $scope.closeCreateIssue = function(){
    $scope.issue = {
    };
    $rootScope.closeModal();
  };
});
