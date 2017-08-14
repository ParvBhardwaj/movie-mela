'use strict';

(function(){

class TheaterComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('movieMelaApp')
  .component('theater', {
    templateUrl: 'app/theater/theater.html',
    controller: TheaterComponent,
    controllerAs: 'theaterCtrl'
  });

})();
