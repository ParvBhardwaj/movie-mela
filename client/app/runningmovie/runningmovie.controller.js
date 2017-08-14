'use strict';

(function () {

  class RunningmovieComponent {
    constructor($http, $scope, socket, $routeParams, $rootScope) {

      this.$http = $http;
      this.socket = socket;
      this.$routeParams = $routeParams;
      this.$rootScope = $rootScope;

      this.selectedmovie = [];
      this.selectedimdbID = $routeParams.imdbID;
      this.selectedmapping = [];



      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('runningmovie');
      });


    } //end constructor
    $onInit() {
      this.$http.get('/api/moviemappings').then(response => {
        this.selectedmapping = response.data;
        this.socket.syncUpdates('runningmovie', this.selectedmapping);
        // alert(this.selectedmapping);
      });

      this.$http.get('/api/movies/imdb/' + this.selectedimdbID).then(response => {
        this.selectedmovie = response.data;
        this.socket.syncUpdates('runningmovie', this.selectedmovie);
      });
    }
    storeDate(d) {
      this.$rootScope.run2book = {};
      this.$rootScope.run2book.date = d;
      console.log(this.$rootScope.run2book);
      //store d in date
    }

    storeData(r, t) {
      this.$rootScope.run2book.time = t;
      this.$rootScope.run2book.movie = r.movie;
      this.$rootScope.run2book.city = r.city;
      this.$rootScope.run2book.cine = r.cine;
      console.log(this.$rootScope.run2book);
      debugger;
    }

  }//end class

  angular.module('movieMelaApp')
    .component('runningmovie', {
      templateUrl: 'app/runningmovie/runningmovie.html',
      controller: RunningmovieComponent,
      controllerAs: 'runningmovieCtrl'
    });

})();
