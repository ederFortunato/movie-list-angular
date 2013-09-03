'use strict';

/* Controllers */

angular.module('myApp.controllers', ['localStorage']).

  controller('MenuCtrl',  ['$scope', '$location', function($scope, $location) {
    var current = $location.path();
    current = current.substr(1, current.length-1);
    $scope.munuActive = current;
  }])

  .controller('AllMoviesCtrl',  ['$scope', '$http', 'myMoviesService', function($scope, $http, myMoviesService) {

    $scope.isLoading = false;

    $scope.doSubmit = function(){
      $scope.isLoading = true;

      var urlserver = 'server/proxy.php?q=' + $scope.filterMovie;
      $http.get(urlserver)
        .success(function(data) {
          for (var i = data.length - 1; i >= 0; i--) {
            data[i].my_status = myMoviesService.getStatus(data[i].imdb_id);
            data[i].my_rating = myMoviesService.getRating(data[i].imdb_id);
          }
          $scope.movies = data;
          $scope.isLoading = false;
        })
        .error(function(data, status, headers, config) {
          $scope.isLoading = false;
        });
    };

    $scope.changeStatusMovie = function(idMovie, status){
      myMoviesService.changeStatus(idMovie, status);

      for (var i = $scope.movies.length - 1; i >= 0; i--){
        if($scope.movies[i].imdb_id == idMovie){
          $scope.movies[i].my_status = status;
        }
      }
    };
  }])

  .controller('MyMoviesCtrl', ['$scope', '$http', 'myMoviesService', function($scope, $http, myMoviesService) {
    $scope.filterMovie = {my_status: ''};

    var ids = myMoviesService.getAllMy();
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
          data[i].my_status = myMoviesService.getStatus(data[i].imdb_id);
          data[i].my_rating = myMoviesService.getRating(data[i].imdb_id);
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
       return myMoviesService.getStatus(idMovie);
    };

    $scope.changeRating = function(idMovie, stars){
      myMoviesService.changeRating(idMovie, stars);

      for (var i = $scope.mymovies.length - 1; i >= 0; i--){
        if($scope.mymovies[i].imdb_id == idMovie){
          $scope.mymovies[i].my_rating = stars;
        }
      }

    };

    $scope.changeStatusMovie = function(idMovie, status){
      myMoviesService.changeStatus(idMovie, status);

      for (var i = $scope.mymovies.length - 1; i >= 0; i--){
        if($scope.mymovies[i].imdb_id == idMovie){
          $scope.mymovies[i].my_status = status;
        }
      }
    };

    $scope.removeMovie = function(idMovie){
      myMoviesService.remove(idMovie);

      for (var i = $scope.mymovies.length - 1; i >= 0; i--){
        if($scope.mymovies[i].imdb_id == idMovie){
          $scope.mymovies.splice(i, 1);
        }
      }
    };
  }]);