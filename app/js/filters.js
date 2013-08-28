'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('statusMovieStr', [function() {
    return function(text) {
      var status = ['Not Watched', 'Watched', 'Want Watch'];
      return status[text];
    };
  }])

  .filter('statusMovieColor', [function() {
    return function(text) {
      var status = ['default', 'success', 'warning'];
      return status[text];
    };
  }]);
