'use strict';

angular.module('movieMelaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seatbooking', {
        template: '<seatbooking></seatbooking>'
      });
  });
