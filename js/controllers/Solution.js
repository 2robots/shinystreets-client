
angular.module('shinystreets.SolutionCtrl', [])

.controller('SolutionCtrl', function($scope, $rootScope) {

	$scope.solution = 
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
  };
});