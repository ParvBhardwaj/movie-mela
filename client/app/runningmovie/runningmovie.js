'use strict';

angular.module('movieMelaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/runningmovie', {
        template: '<runningmovie></runningmovie>'
      });
  });
