'use strict';

angular.module('movieMelaApp.auth', ['movieMelaApp.constants', 'movieMelaApp.util', 'ngCookies',
    'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
