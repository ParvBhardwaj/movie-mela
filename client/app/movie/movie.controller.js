'use strict';

(function(){

class MovieComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('movieMelaApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent,
    controllerAs: 'movieCtrl'
  });

})();
