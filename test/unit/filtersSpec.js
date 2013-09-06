'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
  beforeEach(module('myApp.filters'));

  describe('statusMovieStr', function() {

    it('should test each stats', inject(function(statusMovieStrFilter) {
      expect(statusMovieStrFilter('0')).toEqual('Not Watched');
      expect(statusMovieStrFilter('1')).toEqual('Watched');
      expect(statusMovieStrFilter('2')).toEqual('Want Watch');
    }));

  });

  describe('statusMovieColor', function() {

    it('should test each stats', inject(function(statusMovieColorFilter) {
      expect(statusMovieColorFilter('0')).toEqual('default');
      expect(statusMovieColorFilter('1')).toEqual('success');
      expect(statusMovieColorFilter('2')).toEqual('warning');
    }));

  });

});
