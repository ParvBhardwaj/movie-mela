'use strict';

class SettingsController {
  // errors = {};
  // submitted = false;

  constructor(Auth) {
    this.Auth = Auth;
    this.errors = {};
    this.submitted = false;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors = {};
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('movieMelaApp')
  .controller('SettingsController', SettingsController);
