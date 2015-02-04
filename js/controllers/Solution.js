
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
      },
      {
        creator: {
          id: '54611d88a8ef065a721b1a1c', 
          username: 'Oswald'
        }, 
        description: 'Ich finde die Lösung schwachsinnig. Der Gehsteig vor der Bibliothek ist nicht so breit, als dass man dort noch eine Rampe hinbauen könnte. Ich hab eine neue Lösung zu der Issue erstellt, in der ich vorgeschlagen habe, einfach den Hintereingang als barrierefreien Zugang zu verwenden.'
      }
    ]
  };

  // save reference to current issue
  $rootScope.currentSolution = $scope.solution;
});