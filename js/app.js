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

  // controllers
  'shinystreets.MainCtrl'
];

angular.module('shinystreets', modules)

.config(function ($compileProvider){
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($routeProvider, $locationProvider) {
});

