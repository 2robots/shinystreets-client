// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var modules = [
  
  // ionic modules
  'ionic', 
  'ngRoute', 
  'ngAnimate', 
  
  //services
  'shinystreets.Config',
  'shinystreets.Authentication',
  'shinystreets.GenericResources',
  
  //resources services
  'shinystreets.Area',
  'shinystreets.User',
  
  // controllers
  'shinystreets.MainCtrl',
  'shinystreets.IssuesCtrl',
  'shinystreets.IssueCtrl',  
  'shinystreets.AreasCtrl', 
  'shinystreets.LoginCtrl'
];

var shinystreets = angular.module('shinystreets', modules)

.config(function ($compileProvider, $httpProvider){
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($routeProvider, $locationProvider) {

  $routeProvider.when('/issues', {
    templateUrl: 'templates/issues.html', 
    controller: 'IssuesCtrl'
  });
  
  $routeProvider.when('/issues/:id', {
    templateUrl: 'templates/issue.html',
    controller: 'IssueCtrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/issues'
  });
});

