'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/allmovies', {templateUrl: 'partials/allMovies.html', controller: 'AllMoviesCtrl'});
    $routeProvider.when('/mymovies', {templateUrl: 'partials/myMovies.html', controller: 'MyMoviesCtrl'});
    $routeProvider.otherwise({redirectTo: '/allmovies'});
  }]);
