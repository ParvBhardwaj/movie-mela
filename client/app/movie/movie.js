'use strict';

angular.module('movieMelaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movie', {
        template: '<movie></movie>'
      });
  });
