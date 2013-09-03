'use strict';

/* Directives */


angular.module('myApp.directives', [])
.directive('stComboStatus', function(){
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: {
        currentSt:'@stComboStatus',
        idMovie:'@stComboIdMovie',
        stComboOnChange:'&'
      },
      template: '<div class="btn-group gallery-movie-ctrl">' +
                  '<button class="btn btn-{{currentSt | statusMovieColor}} dropdown-toggle" type="button" data-toggle="dropdown">' +
                    '{{currentSt | statusMovieStr}} <span class="caret"></span>' +
                  '</button>' +
                  '<ul class="dropdown-menu">' +
                   '<li><button class="btn btn-link" ng-click="clickItem(idMovie, 0)">Not Watched</button></li>' +
                   '<li><button class="btn btn-link" ng-click="clickItem(idMovie, 1)">Watched</button></li>' +
                   '<li><button class="btn btn-link" ng-click="clickItem(idMovie, 2)">Want Watch</button></li>' +
                  '</ul>' +
                '</div>',
      link: function(scope, element, attrs) {
        scope.clickItem = function(a, b){
          scope.stComboOnChange({idMovie:a, status:b});
        };
      }
    };
  });
