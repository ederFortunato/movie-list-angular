'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['localStorage']).
  service('myMoviesService', function($store) {
    var _self = this;

    if($store.get('lsMyMoviesABC') === null)
      $store.set('lsMyMoviesABC', {});

    this.getAllMy = function() {
        return $store.get('lsMyMoviesABC');
    };

    this.getRating = function(idMovie){
      var lsMovies = _self.getAllMy();
      var current = lsMovies.hasOwnProperty(idMovie) ? lsMovies[idMovie].my_rating : null;
      return current ? current : 0;
    };

    this.getStatus = function(idMovie){
      var lsMovies = _self.getAllMy();
      var current = lsMovies.hasOwnProperty(idMovie) ? lsMovies[idMovie].my_status : null;
      return current ? current : 0;
    };

    this.changeRating = function(idMovie, stars){
      var lsMovies = _self.getAllMy();
      if(lsMovies[idMovie]){
        lsMovies[idMovie].my_rating = stars;
      }else{
        lsMovies[idMovie] = {my_status: 0, my_rating: stars};
      }
      $store.set('lsMyMoviesABC', lsMovies);
    };

    this.changeStatus = function(idMovie, status){
      var lsMovies = _self.getAllMy();
      if(lsMovies[idMovie]){
        lsMovies[idMovie].my_status = status;
      }else{
        lsMovies[idMovie] = {my_status: status, my_rating: 0};
      }
      $store.set('lsMyMoviesABC', lsMovies);
    };

    this.remove = function(idMovie){
      var lsMovies = $store.get('lsMyMoviesABC');
      if(lsMovies.hasOwnProperty(idMovie)){
        delete lsMovies[idMovie];
      }
      $store.set('lsMyMoviesABC', lsMovies);
    };
  });
