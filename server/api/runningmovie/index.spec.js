'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var runningmovieCtrlStub = {
  index: 'runningmovieCtrl.index',
  show: 'runningmovieCtrl.show',
  create: 'runningmovieCtrl.create',
  update: 'runningmovieCtrl.update',
  destroy: 'runningmovieCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var runningmovieIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './runningmovie.controller': runningmovieCtrlStub
});

describe('Runningmovie API Router:', function() {

  it('should return an express router instance', function() {
    expect(runningmovieIndex).to.equal(routerStub);
  });

  describe('GET /api/runningmovies', function() {

    it('should route to runningmovie.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'runningmovieCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/runningmovies/:id', function() {

    it('should route to runningmovie.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'runningmovieCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/runningmovies', function() {

    it('should route to runningmovie.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'runningmovieCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/runningmovies/:id', function() {

    it('should route to runningmovie.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'runningmovieCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/runningmovies/:id', function() {

    it('should route to runningmovie.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'runningmovieCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/runningmovies/:id', function() {

    it('should route to runningmovie.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'runningmovieCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
