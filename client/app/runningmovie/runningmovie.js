'use strict';

angular.module('movieMelaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/runningmovie/:imdbID', {
        template: '<runningmovie></runningmovie>'
      });
  });
