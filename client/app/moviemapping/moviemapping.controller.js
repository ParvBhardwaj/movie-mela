'use strict';

(function () {

  class MoviemappingComponent {
    constructor($http, $scope, socket) {

      this.$http = $http;
      this.socket = socket;
      this.map = {};
      this.mmrec = {};
      this.mmrec.time = [];
      this.mmrec.date = [];

      this.allmoviesmappingsData = {};


      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('moviemapping');
      });
    }
    pushTime() {
      // push selected time in array 
      var vtime = this.mmrec.hr + ':' + this.mmrec.min + ' ' + this.mmrec.ampm;
      // alert(vtime);
      this.mmrec.time.push(vtime);
    }
    pushDate() {
      //push selected date in array

      var vdate = this.mmrec.sdate.toJSON().substr(0, 10);
      // alert(vdate);
      this.mmrec.date.push(vdate);

    }
    Addmoivemapping() {
      this.mmrec.movie = this.mmrec.movieObj.Title;
      debugger;
      alert(JSON.stringify(this.mmrec));

      this.$http.post('/api/moviemappings',
        angular.toJson(this.mmrec)
      );

      this.$http.put('/api/movies/' + this.mmrec.movieObj._id,
        {
          Status: 'running'
        }
      );

      console.log(this.mmrec);
      // this.mmrec = {};
    }
    $onInit() {
      this.$http.get('/api/theaters').then(response => {
        this.alltheaterData = response.data;
        this.socket.syncUpdates('theaters', this.alltheaterData);
        // alert(this.alltheaterData);
      });

      this.$http.get('/api/movies').then(response => {
        this.allMoviesData = response.data;
        this.socket.syncUpdates('movies', this.allMoviesData);
      });
    }

  }//end class

  angular.module('movieMelaApp')
    .component('moviemapping', {
      templateUrl: 'app/moviemapping/moviemapping.html',
      controller: MoviemappingComponent,
      controllerAs: 'moviemappingCtrl'
    });

})();
