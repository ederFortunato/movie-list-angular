module.exports = function (config) {
  config.set({
    basePath : '../',

    // Fix for "JASMINE is not supported anymore" warning
    frameworks : ["jasmine"],

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    browsers : ['Chrome'],

	singleRun = true,

	proxies = {
	  '/': 'http://localhost:8000/'
	},

    junitReporter : {
      outputFile : 'test_out/e2e.xml',
      suite      : 'e2e'
      //...
    }
  });
};