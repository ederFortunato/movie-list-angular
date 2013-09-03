'use strict';

/* Controllers */

angular.module('myApp.controllers', ['localStorage']).

  controller('MenuCtrl',  ['$scope', '$location', function($scope, $location) {
    var current = $location.path();
    current = current.substr(1, current.length-1);
    $scope.munuActive = current;
  }])

  .controller('AllMoviesCtrl',  ['$scope', 'myMoviesService', 'imdbService', function($scope, myMoviesService, imdbService) {

    $scope.isLoading = false;

    $scope.doSubmit = function(){
      var parans = {
        q: $scope.filterMovie,
        success: function(data){
          $scope.movies = data;
          $scope.isLoading = false;
        },
        error: function(data){
          $scope.isLoading = false;
        }
      };

      $scope.isLoading = true;
      imdbService.findMovies(parans);
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

  .controller('MyMoviesCtrl', ['$scope', 'myMoviesService', 'imdbService', function($scope, myMoviesService, imdbService) {
    $scope.filterMovie = {my_status: ''};

    var idsMovies = myMoviesService.getAllIDs();

    var parans = {
      ids: idsMovies,
      success: function(data){
        $scope.mymovies = data;
        $scope.isLoading = false;
      },
      error: function(data){
        $scope.isLoading = false;
      }
    };

    $scope.isLoading = true;
    imdbService.getMovies(parans);

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