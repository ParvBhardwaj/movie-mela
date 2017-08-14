'use strict';

(function () {

  class TheaterComponent {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.theaterData = {};
      this.alltheaterData = {};

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('theater');
      });
    }

    AddTheater() {
      alert("hogyaa");
      console.log(this.theaterData);

      this.$http.post('/api/theaters',
        angular.toJson(this.theaterData)
      );
      console.log(this.theaterData);
      this.Cine = '';
      this.City = '';

    }

    $onInit() {
      this.$http.get('/api/theaters').then(response => {
        this.alltheaterData = response.data;
        this.socket.syncUpdates('theaters', this.alltheaterData);
      });
    }

    deleteThing(thing) {
      console.log("deleting theater" + thing);
      this.$http.delete('/api/theaters/' + thing._id);
    }
    editThing(thing) {
      angular.copy(thing, this.theaterData);

    }
    updateTheater(thing) {
      alert("update theater" + JSON.stringify(thing));

      this.$http.put('/api/theaters/' + thing._id, {
        Cine: thing.Cine,
        City: thing.City
      });
    }

  }//end class TheaterComponent

  angular.module('movieMelaApp')
    .component('theater', {
      templateUrl: 'app/theater/theater.html',
      controller: TheaterComponent,
      controllerAs: 'theaterCtrl'
    });

})();
