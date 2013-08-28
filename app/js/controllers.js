'use strict';

/* Controllers */

angular.module('myApp.controllers', ['localStorage']).

  controller('MenuCtrl',  ['$scope', '$location', function($scope, $location) {
    $scope.setMenu = function(menu){
        $scope.munuActive = {'allmovies': '','mymovies': ''};
        $scope.munuActive[menu] = 'active';
    };

    var current = $location.path();
    current = current.substr(1, current.length-1);

    $scope.setMenu(current);

  }])

  .controller('AllMoviesCtrl',  ['$scope', '$http', '$store', function($scope, $http, $store) {

    var getStatusMovie = function(idMovie){
      var lsMovies = $store.get('lsMyMoviesABC');
      var current = lsMovies.hasOwnProperty(idMovie) ? lsMovies[idMovie].my_status : null;
      return current ? current : 0;
    };

    var getRatingMovie = function(idMovie){
      var lsMovies = $store.get('lsMyMoviesABC');
      var current = lsMovies.hasOwnProperty(idMovie) ? lsMovies[idMovie].my_rating : null;
      return current ? current : 0;
    };

    if($store.get('lsMyMoviesABC') === null)
      $store.set('lsMyMoviesABC', {});

    $scope.isLoading = false;

    $scope.doSubmit = function(){
      $scope.isLoading = true;

      var urlserver = 'server/proxy.php?q=' + $scope.filterMovie;
      $http.get(urlserver)
        .success(function(data) {
          for (var i = data.length - 1; i >= 0; i--) {
            data[i].my_status = getStatusMovie(data[i].imdb_id);
            data[i].my_rating = getRatingMovie(data[i].imdb_id);
          }
          $scope.movies = data;
          $scope.isLoading = false;
        })
        .error(function(data, status, headers, config) {
          $scope.isLoading = false;
        });
    };

    $scope.changeStatusMovie = function(idMovie, status){

      var lsMovies = $store.get('lsMyMoviesABC');
      if(lsMovies[idMovie]){
        lsMovies[idMovie].my_status = status;
      }else{
        lsMovies[idMovie] = {my_status: status, my_rating: 0};
      }
      $store.set('lsMyMoviesABC', lsMovies);
    };

  }])

  .controller('MyMoviesCtrl', ['$scope', '$http', '$store', function($scope, $http, $store) {

    var getStatusMovie = function(idMovie){
      var lsMovies = $store.get('lsMyMoviesABC');
      var current = lsMovies.hasOwnProperty(idMovie) ? lsMovies[idMovie].my_status : null;
      return current ? current : 0;
    };

    var getRatingMovie = function(idMovie){
      var lsMovies = $store.get('lsMyMoviesABC');
      var current = lsMovies.hasOwnProperty(idMovie) ? lsMovies[idMovie].my_rating : null;
      return current ? current : 0;
    };

    if($store.get('lsMyMoviesABC') === null)
      $store.set('lsMyMoviesABC', {});

    var ids = $store.get('lsMyMoviesABC');
    var myMovies = '';
    for (var prop in ids) {
      if (ids.hasOwnProperty(prop)) {
        myMovies += prop + ',';
      }
    }
    myMovies = myMovies.substr(0, myMovies.length-1);
    var urlserver = 'server/proxy.php?ids=' + myMovies;

    $scope.isLoading = true;
    $http.get(urlserver)
      .success(function(data) {
        for (var i = data.length - 1; i >= 0; i--) {
          data[i].my_status = getStatusMovie(data[i].imdb_id);
          data[i].my_rating = getRatingMovie(data[i].imdb_id);
        }
        $scope.mymovies = data;
        $scope.isLoading = false;
      })
      .error(function(data, status, headers, config) {
        $scope.isLoading = false;
      });

    $scope.getActiveRating = function(a, b){
       return a == b ? 'selectedStar' : '';
    };

    $scope.getStatusMovie = function(idMovie){
       var lsMovies = $store.get('lsMyMoviesABC');
       var current = lsMovies[idMovie].my_status;
       return current ? current : 0;
    };

    $scope.changeRating = function(idMovie, stars){
      var lsMovies = $store.get('lsMyMoviesABC');
      if(lsMovies[idMovie]){
        lsMovies[idMovie].my_rating = stars;
      }else{
        lsMovies[idMovie] = {my_status: 0, my_rating: stars};
      }
      $store.set('lsMyMoviesABC', lsMovies);
    };

    $scope.removeMovie = function(idMovie){
      var lsMovies = $store.get('lsMyMoviesABC');
      if(lsMovies.hasOwnProperty(idMovie)){
        delete lsMovies[idMovie];
      }
      $store.set('lsMyMoviesABC', lsMovies);
    };

  }]);