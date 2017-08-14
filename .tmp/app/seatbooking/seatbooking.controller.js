'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var SeatbookingComponent = function () {
    function SeatbookingComponent($http, $scope, socket, $rootScope, $location) {
      _classCallCheck(this, SeatbookingComponent);

      var _this = this;
      this.$http = $http;
      this.socket = socket;
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$location = $location;

      this.SeatData = {};
      this.bookedSeat = {};
      this.book2pay = {};
      angular.merge(this.book2pay, $rootScope.run2book);

      this.selectedSeats = [];
      this.intCharg = 50;
      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('seatbooking');
      });
    } // end constructor

    _createClass(SeatbookingComponent, [{
      key: '$onInit',
      value: function $onInit() {
        var _this2 = this;

        var uurl = '/api/seatbookings/booked/' + this.book2pay.date + '/' + this.book2pay.time + '/' + this.book2pay.cine + '/' + this.book2pay.movie;

        this.$http.get(uurl).then(function (response) {
          _this2.bookedSeat = {};
          _this2.bookedSeat.selectedSeats = [];
          //initialize before fetch from database

          _this2.bookedSeat = response.data;
          _this2.socket.syncUpdates('seatbookings', _this2.bookedSeat);
          console.log(response.data);

          var seats = document.getElementsByClassName('seatno');
          for (var i = 0; i < seats.length; i++) {
            var sx = seats[i];
            var id = sx.id;

            var findBooked = _this2.bookedSeat.selectedSeats.indexOf(id);
            if (findBooked > -1) sx.style = 'background-color:red;';
          }
        }).catch(function (error) {
          console.log('Error occurred!', error);
        });
        //disable booked  seats
      } //end on init
      //ng-disabled="$ctrl.seatVisibleBar(row,$index)"


    }, {
      key: 'sClick',
      value: function sClick($event) {
        var elem = $event.currentTarget || $event.srcElement;
        var id = elem.id;

        //two task 
        // get find if the clicked seat is in booked seats (onInit)
        //return; and exit this function
        if (typeof this.bookedSeat === 'undefined') this.bookedSeat = {};

        if (typeof this.bookedSeat.selectedSeats === 'undefined') this.bookedSeat.selectedSeats = [];

        var findBooked = this.bookedSeat.selectedSeats.indexOf(id);
        if (findBooked > -1) return;
        debugger;
        var found = this.selectedSeats.indexOf(id);
        if (found > -1) {
          elem.style = '';
          this.selectedSeats.splice(found, 1);
        } else {
          elem.style = 'background-color:#96FF33;';
          this.selectedSeats.push(id);
        }

        console.log(this.selectedSeats);
        this.showSelectedSeats = this.selectedSeats.join(', ');
        this.calcTotal();
      }
    }, {
      key: 'calcTotal',
      value: function calcTotal() {
        var total = this.intCharg;
        for (var s = 0; s < this.selectedSeats.length; s++) {
          var row = this.selectedSeats[s].substring(0, 1);
          if (row == 'A' || row == 'B' || row == 'C') total += 300;else if (row == 'D' || row == 'E' || row == 'F' || row == 'G' || row == 'H') total += 250;else if (row == 'I' || row == 'J' || row == 'K' || row == 'L') total += 200;
        }
        this.total = total;
      }
    }, {
      key: 'goPayment',
      value: function goPayment() {

        this.$rootScope.book2pay = angular.merge({}, this.book2pay);
        this.$rootScope.book2pay.selectedSeats = this.selectedSeats;
        this.$rootScope.book2pay.total = this.total;
        this.$rootScope.book2pay.intCharg = this.intCharg;

        // add more fields in book2pay from this

        this.$location.path('/payment');
      }
    }]);

    return SeatbookingComponent;
  }(); // end class


  angular.module('movieMelaApp').component('seatbooking', {
    templateUrl: 'app/seatbooking/seatbooking.html',
    controller: SeatbookingComponent,
    controllerAs: 'seatbookingCtrl'
  });
})();
//# sourceMappingURL=seatbooking.controller.js.map
