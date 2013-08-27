'use strict';

/* Controllers */

angular.module('myApp.controllers', ['localStorage']).
  controller('AllMoviesCtrl',  ['$scope', '$http', '$store', function($scope, $http, $store) {
  if($store.get('lsMyMovies') === null)
    $store.set('lsMyMovies', {});

    $scope.doSubmit = function(){
      var urlserver = 'server/proxy.php?q=' + $scope.filterMovie  ;
      $http.get(urlserver)
        .success(function(data) {
          $scope.movies = data;
        })
        .error(function(data, status, headers, config) {
          //console.log('error http get');
        });
    };

    $scope.getStatusMovie = function(idMovie){
       var status = ['Not Watched', 'Watched', 'Want Watch'];
       var lsMovies = $store.get('lsMyMovies');
       var current = lsMovies[idMovie];
       return current ? status[current] : status[0];
    };

    $scope.changeStatusMovie = function(idMovie, status){
      var lsMovies = $store.get('lsMyMovies');
      lsMovies[idMovie] = status;
      $store.set('lsMyMovies', lsMovies);
    };

  }])

  .controller('MyMoviesCtrl', [function() {

  }]);

