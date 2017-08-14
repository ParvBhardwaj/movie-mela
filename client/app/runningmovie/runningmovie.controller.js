'use strict';

(function(){

class RunningmovieComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('movieMelaApp')
  .component('runningmovie', {
    templateUrl: 'app/runningmovie/runningmovie.html',
    controller: RunningmovieComponent,
    controllerAs: 'runningmovieCtrl'
  });

})();
