'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MovieComponent = function () {
    function MovieComponent($http, $scope, socket) {
      _classCallCheck(this, MovieComponent);

      this.$http = $http;
      this.socket = socket;
      this.movieData = {};
      this.allMoviesData = {};

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('movie');
      });
    }

    _createClass(MovieComponent, [{
      key: 'AddMovies',
      value: function AddMovies() {
        alert("hogyaa");
        this.$http.post('/api/movies',
        // {
        //   Title: this.movieData.Title,
        //   Year: this.movieData.Year,
        //   Director: this.movieData.Directorw

        // }
        angular.toJson(this.movieData));
        console.log(this.movieData);
        this.Name = '';
        this.Year = '';
        this.poster = '';
      }
    }, {
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/movies').then(function (response) {
          _this.allMoviesData = response.data;
          _this.socket.syncUpdates('movie', _this.allMoviesData);
        });
      }
    }, {
      key: 'getOmdbMovie',
      value: function getOmdbMovie() {
        var _this2 = this;

        // alert('data at search ' + this.Name + this.Year);
        //http://www.omdbapi.com/?t=dangal&y=2016
        this.$http.get('http://www.omdbapi.com/?t=' + this.Name + '&y=' + this.Year + '&plot=short&r=json').then(function (response) {
          alert(JSON.stringify(response));
          _this2.movieData = response.data;
          _this2.socket.syncUpdates('movie', _this2.movieData);
        });
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        console.log("deleting movie" + thing);
        this.$http.delete('/api/movies/' + thing._id);
      }
    }]);

    return MovieComponent;
  }(); //end class

  angular.module('movieMelaApp').component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent,
    controllerAs: 'movieCtrl'
  });
})();
//# sourceMappingURL=movie.controller.js.map
