'use strict';

(function () {

  class MovieComponent {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.movieData = {};
      this.allMoviesData = {};

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('movie');
      });
    }

    AddMovies() {
      alert("hogyaa");
      this.$http.post('/api/movies',
        // {
        //   Title: this.movieData.Title,
        //   Year: this.movieData.Year,
        //   Director: this.movieData.Directorw

        // }
        angular.toJson(this.movieData)
      );
      console.log(this.movieData);
      this.Name = '';
      this.Year = '';
      this.poster = '';

    }

    $onInit() {
      this.$http.get('/api/movies').then(response => {
        this.allMoviesData = response.data;
        this.socket.syncUpdates('movie', this.allMoviesData);
      });
    }

    getOmdbMovie() {
      // alert('data at search ' + this.Name + this.Year);
      //http://www.omdbapi.com/?t=dangal&y=2016
      this.$http.get('http://www.omdbapi.com/?t=' + this.Name + '&y=' + this.Year + '&plot=short&r=json')
        .then(response => {
          alert(JSON.stringify(response));
          this.movieData = response.data;
          this.socket.syncUpdates('movie', this.movieData);
        });
    }

    deleteThing(thing) {
      console.log("deleting movie" + thing);
      this.$http.delete('/api/movies/' + thing._id);
    }



  } //end class

  angular.module('movieMelaApp')
    .component('movie', {
      templateUrl: 'app/movie/movie.html',
      controller: MovieComponent,
      controllerAs: 'movieCtrl'
    });

})();
