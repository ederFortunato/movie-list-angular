'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /allmovies when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/allmovies");
  });


  describe('All Movies', function() {

    beforeEach(function() {
      browser().navigateTo('#/allmovies');
    });


    it('should render allmovies when user navigates to /allmovies', function() {
      expect(element('[ng-view] h2:first').text()).
        toMatch(/All Movies/);
    });

  });


  describe('My Movies', function() {

    beforeEach(function() {
      browser().navigateTo('#/mymovies');
    });


    it('should render mymovies when user navigates to /mymovies', function() {
      expect(element('[ng-view] h2:first').text()).
        toMatch(/My Movies/);
    });

  });
});
