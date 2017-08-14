'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController = function () {
  //end-non-standard

  //start-non-standard
  function NavbarController($location, Auth) {
    _classCallCheck(this, NavbarController);

    this.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    this.isCollapsed = true;

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  _createClass(NavbarController, [{
    key: 'isActive',
    value: function isActive(route) {
      return route === this.$location.path();
    }
  }, {
    key: 'SearchMovies',
    value: function SearchMovies() {
      alert("hora hai bhaiyaa ji");
      this.$http.post('/api/navbar', angular.toJson(this.navbarData));
    }
    //end class

  }]);

  return NavbarController;
}();

angular.module('movieMelaApp').controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map
