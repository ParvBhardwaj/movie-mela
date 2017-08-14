'use strict';

(function(){

class SeatbookingComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('movieMelaApp')
  .component('seatbooking', {
    templateUrl: 'app/seatbooking/seatbooking.html',
    controller: SeatbookingComponent,
    controllerAs: 'seatbookingCtrl'
  });

})();
