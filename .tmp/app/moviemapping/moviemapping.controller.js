'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MoviemappingComponent = function () {
    function MoviemappingComponent($http, $scope, socket) {
      _classCallCheck(this, MoviemappingComponent);

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

    _createClass(MoviemappingComponent, [{
      key: 'pushTime',
      value: function pushTime() {
        // push selected time in array 
        var vtime = this.mmrec.hr + ':' + this.mmrec.min + ' ' + this.mmrec.ampm;
        // alert(vtime);
        this.mmrec.time.push(vtime);
      }
    }, {
      key: 'pushDate',
      value: function pushDate() {
        //push selected date in array

        var vdate = this.mmrec.sdate.toJSON().substr(0, 10);
        // alert(vdate);
        this.mmrec.date.push(vdate);
      }
    }, {
      key: 'Addmoivemapping',
      value: function Addmoivemapping() {
        this.mmrec.movie = this.mmrec.movieObj.Title;
        debugger;
        alert(JSON.stringify(this.mmrec));

        this.$http.post('/api/moviemappings', angular.toJson(this.mmrec));

        this.$http.put('/api/movies/' + this.mmrec.movieObj._id, {
          Status: 'running'
        });

        console.log(this.mmrec);
        // this.mmrec = {};
      }
    }, {
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/theaters').then(function (response) {
          _this.alltheaterData = response.data;
          _this.socket.syncUpdates('theaters', _this.alltheaterData);
          // alert(this.alltheaterData);
        });

        this.$http.get('/api/movies').then(function (response) {
          _this.allMoviesData = response.data;
          _this.socket.syncUpdates('movies', _this.allMoviesData);
        });
      }
    }]);

    return MoviemappingComponent;
  }(); //end class

  angular.module('movieMelaApp').component('moviemapping', {
    templateUrl: 'app/moviemapping/moviemapping.html',
    controller: MoviemappingComponent,
    controllerAs: 'moviemappingCtrl'
  });
})();
//# sourceMappingURL=moviemapping.controller.js.map
