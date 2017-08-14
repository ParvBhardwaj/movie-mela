'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var RunningmovieComponent = function () {
    function RunningmovieComponent($http, $scope, socket, $routeParams, $rootScope) {
      _classCallCheck(this, RunningmovieComponent);

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


    _createClass(RunningmovieComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/moviemappings').then(function (response) {
          _this.selectedmapping = response.data;
          _this.socket.syncUpdates('runningmovie', _this.selectedmapping);
          // alert(this.selectedmapping);
        });

        this.$http.get('/api/movies/imdb/' + this.selectedimdbID).then(function (response) {
          _this.selectedmovie = response.data;
          _this.socket.syncUpdates('runningmovie', _this.selectedmovie);
        });
      }
    }, {
      key: 'storeDate',
      value: function storeDate(d) {
        this.$rootScope.run2book = {};
        this.$rootScope.run2book.date = d;
        console.log(this.$rootScope.run2book);
        //store d in date
      }
    }, {
      key: 'storeData',
      value: function storeData(r, t) {
        this.$rootScope.run2book.time = t;
        this.$rootScope.run2book.movie = r.movie;
        this.$rootScope.run2book.city = r.city;
        this.$rootScope.run2book.cine = r.cine;
        console.log(this.$rootScope.run2book);
        debugger;
      }
    }]);

    return RunningmovieComponent;
  }(); //end class

  angular.module('movieMelaApp').component('runningmovie', {
    templateUrl: 'app/runningmovie/runningmovie.html',
    controller: RunningmovieComponent,
    controllerAs: 'runningmovieCtrl'
  });
})();
//# sourceMappingURL=runningmovie.controller.js.map
