'use strict';

(function(){

class MoviemappingComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('movieMelaApp')
  .component('moviemapping', {
    templateUrl: 'app/moviemapping/moviemapping.html',
    controller: MoviemappingComponent,
    controllerAs: 'moviemappingCtrl'
  });

})();
