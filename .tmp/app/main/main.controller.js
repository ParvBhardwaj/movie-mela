'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http, $scope, socket) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.socket = socket;
      this.movieData = {};
      this.allMoviesData = [];

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('movie');
      });
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/movies').then(function (response) {
          _this.allMoviesData = response.data;
          _this.socket.syncUpdates('movie', _this.allMoviesData);
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

    }, {
      key: 'addThing',
      value: function addThing() {
        if (this.newThing) {
          this.$http.post('/api/things', {
            name: this.newThing
          });
          this.newThing = '';
        }
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/things/' + thing._id);
      }
    }]);

    return MainController;
  }();

  angular.module('movieMelaApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'mainCtrl'
  });
})();
//# sourceMappingURL=main.controller.js.map
