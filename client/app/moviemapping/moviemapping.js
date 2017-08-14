'use strict';

angular.module('movieMelaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviemapping', {
        template: '<moviemapping></moviemapping>'
      });
  });
