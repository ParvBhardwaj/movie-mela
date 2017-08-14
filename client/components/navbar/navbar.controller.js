'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  isActive(route) {
    return route === this.$location.path();
  }
  SearchMovies() {
    alert("hora hai bhaiyaa ji");
    this.$http.post('/api/navbar',

      angular.toJson(this.navbarData)
    );


  }
  //end class
}



angular.module('movieMelaApp')
  .controller('NavbarController', NavbarController);
