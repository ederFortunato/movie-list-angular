'use strict';

/* Services */

var SERVER = 'http://localhost/html/angular/movie-list-angular/app/';
// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['localStorage']).
  service('myMoviesService', function($store) {
    var _self = this;
    var ID_STORAGE = '';

    this.setStorageID = function(id){
      ID_STORAGE = id;
      if($store.get(ID_STORAGE) === null)
        $store.set(ID_STORAGE, {});
    };

    this.setStorageID('lsMovies123');

    this.getAllMy = function() {
        return $store.get(ID_STORAGE);
    };

    this.getAllIDs = function() {
      var lsMovies = _self.getAllMy();
      var idsMovies = '';
      for (var prop in lsMovies) {
        if (lsMovies.hasOwnProperty(prop)) {
          idsMovies += prop + ',';
        }
      }
      return idsMovies.substr(0, idsMovies.length - 1);
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
      $store.set(ID_STORAGE, lsMovies);
    };

    this.changeStatus = function(idMovie, status){
      var lsMovies = _self.getAllMy();
      if(lsMovies[idMovie]){
        lsMovies[idMovie].my_status = status;
      }else{
        lsMovies[idMovie] = {my_status: status, my_rating: 0};
      }
      $store.set(ID_STORAGE, lsMovies);
    };

    this.remove = function(idMovie){
      var lsMovies = $store.get(ID_STORAGE);
      if(lsMovies.hasOwnProperty(idMovie)){
        delete lsMovies[idMovie];
      }
      $store.set(ID_STORAGE, lsMovies);
    };
  })
  .service('imdbService', ['$http', '$store', 'myMoviesService', function($http, $store, myMoviesService) {
    this.findMovies = function(args){
      var urlserver = SERVER + 'server/proxy.php?q=' + args.q;
      $http.get(urlserver)
        .success(function(data) {
          for (var i = data.length - 1; i >= 0; i--) {
            data[i].my_status = myMoviesService.getStatus(data[i].imdb_id);
            data[i].my_rating = myMoviesService.getRating(data[i].imdb_id);
          }
          args.success(data);
        })
        .error(function(data, status, headers, config) {
          args.error(data);
        });
    };

    this.getMovies = function(args){
      var urlserver = SERVER + 'server/proxy.php?ids=' + args.ids;
      $http.get(urlserver)
        .success(function(data) {
          for (var i = data.length - 1; i >= 0; i--) {
            data[i].my_status = myMoviesService.getStatus(data[i].imdb_id);
            data[i].my_rating = myMoviesService.getRating(data[i].imdb_id);
          }
          args.success(data);
        })
        .error(function(data, status, headers, config) {
          args.error(data);
        });
    };

  }]);
