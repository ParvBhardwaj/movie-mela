'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviemappingCtrlStub = {
  index: 'moviemappingCtrl.index',
  show: 'moviemappingCtrl.show',
  create: 'moviemappingCtrl.create',
  update: 'moviemappingCtrl.update',
  destroy: 'moviemappingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviemappingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './moviemapping.controller': moviemappingCtrlStub
});

describe('Moviemapping API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviemappingIndex).to.equal(routerStub);
  });

  describe('GET /api/moviemappings', function() {

    it('should route to moviemapping.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviemappingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/moviemappings/:id', function() {

    it('should route to moviemapping.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviemappingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/moviemappings', function() {

    it('should route to moviemapping.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviemappingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/moviemappings/:id', function() {

    it('should route to moviemapping.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviemappingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/moviemappings/:id', function() {

    it('should route to moviemapping.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviemappingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/moviemappings/:id', function() {

    it('should route to moviemapping.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviemappingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
