'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var PaymentComponent = function () {
    function PaymentComponent($http, $scope, socket, $rootScope) {
      _classCallCheck(this, PaymentComponent);

      this.$http = $http;
      this.socket = socket;
      this.$rootScope = $rootScope;
      this.bookdt = $rootScope.book2pay;
      this.run2book = $rootScope.run2book;

      //angular.merge(this.book2pay, $rootScope.book2pay);

      this.payData = {};
      console.log(this.bookdt);

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('payment');
      });
    } //end  constructor


    _createClass(PaymentComponent, [{
      key: 'payNow',
      value: function payNow() {
        alert("Successfull Your Payment has done");
        this.payData.total = this.bookdt.total;

        this.$http.post('/api/payments', angular.toJson(this.payData));

        this.$http.post('/api/seatbookings ', angular.toJson(this.bookdt));
      }
    }]);

    return PaymentComponent;
  }(); //end class PaymentComponent

  angular.module('movieMelaApp').component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });
})();
//# sourceMappingURL=payment.controller.js.map
