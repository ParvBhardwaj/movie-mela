'use strict';

angular.module('movieMelaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theater', {
        template: '<theater></theater>'
      });
  });
