'use strict';

(function () {

  class PaymentComponent {
    constructor($http, $scope, socket, $rootScope) {
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
    }//end  constructor


    payNow() {
      alert("Successfull Your Payment has done");
      this.payData.total = this.bookdt.total;

      this.$http.post('/api/payments',
        angular.toJson(this.payData)
      );

      this.$http.post('/api/seatbookings ',
        angular.toJson(this.bookdt)
      );

    }

  }//end class PaymentComponent

  angular.module('movieMelaApp')
    .component('payment', {
      templateUrl: 'app/payment/payment.html',
      controller: PaymentComponent,
      controllerAs: 'paymentCtrl'
    });

})();
