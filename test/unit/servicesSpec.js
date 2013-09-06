'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));

  describe('myMoviesService', function() {
    it('should be empyt', inject(function(myMoviesService) {
      myMoviesService.setStorageID('TEST');
      expect(myMoviesService.getAllMy()).toEqual({});
    }));

    it('should status be 1', inject(function(myMoviesService) {
      myMoviesService.changeStatus(1, 1);
     	expect(myMoviesService.getStatus(1)).toEqual(1);
    }));

    it('should rating be 5', inject(function(myMoviesService) {
      myMoviesService.changeRating(1, 5);
      expect(myMoviesService.getRating(1)).toEqual(5);
    }));

    it('should get all movies ID', inject(function(myMoviesService) {
      myMoviesService.changeStatus(2, 1);//add
      expect(myMoviesService.getAllIDs()).toEqual('1,2');
    }));

    it('should remove 2 movies', inject(function(myMoviesService) {
      myMoviesService.remove(1);
      expect(myMoviesService.getAllIDs()).toEqual('2');
      myMoviesService.remove(2);
      expect(myMoviesService.getAllMy()).toEqual({});
    }));

  });

  /*describe('imdbService', function() {
    it('should be empyt', inject(function(_$httpBackend_, imdbService) {
      var callback = jasmine.createSpy();
      var parans = {
        q: 'Titanic',
        success: callback,
        error: callback
      };

      imdbService.findMovies(parans);
      waitsFor(function() {
          return callback.callCount > 0;
      }, "The Ajax call timed out.", 5000);

      runs(function() {
          expect(callback).toHaveBeenCalled();
      });
    }));
  });
*/
});
