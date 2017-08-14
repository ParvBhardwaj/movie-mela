'use strict';

(function () {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.movieData = {};
      this.allMoviesData = [];

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('movie');
      });
    }


    $onInit() {
      this.$http.get('/api/movies').then(response => {
        this.allMoviesData = response.data;
        this.socket.syncUpdates('movie', this.allMoviesData);
      });
    }

    // $onInit() {

    //   this.$http.get('/api/movies').then(response => {
    //     this.allMovies = response.data;
    //     // this.socket.syncUpdates('movies', this.allMovies);
    //     console.log(this.allMovies[0]);
    //     alert(JSON.stringify(this.allMovies[0]));
    //   });

    //   // $(document).ready(function () {
    //   //   $('#myCarousel').carousel({
    //   //     interval: 3000, cycle: true
    //   //   });
    //   // });
    // }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('movieMelaApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'mainCtrl'
    });
})();
