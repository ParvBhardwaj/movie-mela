'use strict';

describe('Component: RunningmovieComponent', function () {

  // load the controller's module
  beforeEach(module('movieMelaApp'));

  var RunningmovieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    RunningmovieComponent = $componentController('runningmovie', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
