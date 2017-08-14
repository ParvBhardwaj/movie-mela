'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var TheaterComponent = function () {
    function TheaterComponent($http, $scope, socket) {
      _classCallCheck(this, TheaterComponent);

      this.$http = $http;
      this.socket = socket;
      this.theaterData = {};
      this.alltheaterData = {};

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('theater');
      });
    }

    _createClass(TheaterComponent, [{
      key: 'AddTheater',
      value: function AddTheater() {
        alert("hogyaa");
        console.log(this.theaterData);

        this.$http.post('/api/theaters', angular.toJson(this.theaterData));
        console.log(this.theaterData);
        this.Cine = '';
        this.City = '';
      }
    }, {
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/theaters').then(function (response) {
          _this.alltheaterData = response.data;
          _this.socket.syncUpdates('theaters', _this.alltheaterData);
        });
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        console.log("deleting theater" + thing);
        this.$http.delete('/api/theaters/' + thing._id);
      }
    }, {
      key: 'editThing',
      value: function editThing(thing) {
        angular.copy(thing, this.theaterData);
      }
    }, {
      key: 'updateTheater',
      value: function updateTheater(thing) {
        alert("update theater" + JSON.stringify(thing));

        this.$http.put('/api/theaters/' + thing._id, {
          Cine: thing.Cine,
          City: thing.City
        });
      }
    }]);

    return TheaterComponent;
  }(); //end class TheaterComponent

  angular.module('movieMelaApp').component('theater', {
    templateUrl: 'app/theater/theater.html',
    controller: TheaterComponent,
    controllerAs: 'theaterCtrl'
  });
})();
//# sourceMappingURL=theater.controller.js.map
