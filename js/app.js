// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var modules = [

  // ionic modules
  'ionic',

  // other angular modules
  'ngResource',

  // 3d party modules
  'angularLocalStorage',

  //services
  'shinystreets.Config',
  'shinystreets.Authentication',
  'shinystreets.GenericResources',
  'shinystreets.FileUploader',

  //resources services
  'shinystreets.Area',
  'shinystreets.User',
  'shinystreets.Issue',
  'shinystreets.File',

  // controllers
  'shinystreets.MainCtrl',
  'shinystreets.MapCtrl',
  'shinystreets.ProfileCtrl',
  'shinystreets.IssuesCtrl',
  'shinystreets.IssueCtrl',
  'shinystreets.UserIssuesCtrl',
  'shinystreets.CreateIssueCtrl',
  'shinystreets.CreateSolutionCtrl', 
  'shinystreets.CreateCommentCtrl', 
  'shinystreets.SolutionCtrl',

  'shinystreets.AreasCtrl',
  'shinystreets.LoginCtrl',
  'shinystreets.RegisterCtrl',

  'shinystreets.WelcomeCtrl'
];

var shinystreets = angular.module('shinystreets', modules)

/*.config(function ($compileProvider, $httpProvider){
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})*/
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.maxCache(0);

  $stateProvider

    .state('welcome', {
      url: "/welcome",
      templateUrl: "templates/welcome.html",
      controller: 'WelcomeCtrl'
    })

    .state('tabs', {
      url: "/tabs",
      abstract: true,
      templateUrl: "templates/mainTabs.html"
    })

    .state('tabs.issues', {
      url: "/issues",
      views: {
        'issues-tab': {
          templateUrl: "templates/issues.html",
          controller: 'IssuesCtrl'
        }
      }
    })

    .state('tabs.issue', {
      url: "/issues/:id",
      views: {
        'issues-tab': {
          templateUrl: "templates/issue.html",
          controller: 'IssueCtrl'
        }
      }
    })

    .state('tabs.solution', {
      url: "/issues/:id/solutions/:sid",
      views: {
        'issues-tab': {
          templateUrl: "templates/solution.html",
          controller: 'SolutionCtrl'
        }
      }
    })

    .state('tabs.map', {
      url: "/map",
      views: {
        'map-tab': {
          templateUrl: "templates/map.html",
          controller: 'MapCtrl'
        }
      }
    })

    .state('tabs.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('tabs.profileIssues', {
      url: "/profile/:userid/issues",
      views: {
        'profile-tab': {
          templateUrl: "templates/issues.html",
          controller: 'UserIssuesCtrl'
        }
      }
    })

    .state('tabs.profileIssue', {
      url: "/profile/:userid/issues/:id",
      views: {
        'profile-tab': {
          templateUrl: "templates/issue.html",
          controller: 'IssueCtrl'
        }
      }
    });

    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise(function($injector, $location){
      Config = $injector.get('Config');

      if(Config.userConfig().opened) {
        return "/tabs/issues";
      } else {
        return "/welcome";
      }
    });
});

