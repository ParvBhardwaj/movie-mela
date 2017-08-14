'use strict';

var app = require('../..');
import request from 'supertest';

var newRunningmovie;

describe('Runningmovie API:', function() {

  describe('GET /api/runningmovies', function() {
    var runningmovies;

    beforeEach(function(done) {
      request(app)
        .get('/api/runningmovies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          runningmovies = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(runningmovies).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/runningmovies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/runningmovies')
        .send({
          name: 'New Runningmovie',
          info: 'This is the brand new runningmovie!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRunningmovie = res.body;
          done();
        });
    });

    it('should respond with the newly created runningmovie', function() {
      expect(newRunningmovie.name).to.equal('New Runningmovie');
      expect(newRunningmovie.info).to.equal('This is the brand new runningmovie!!!');
    });

  });

  describe('GET /api/runningmovies/:id', function() {
    var runningmovie;

    beforeEach(function(done) {
      request(app)
        .get('/api/runningmovies/' + newRunningmovie._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          runningmovie = res.body;
          done();
        });
    });

    afterEach(function() {
      runningmovie = {};
    });

    it('should respond with the requested runningmovie', function() {
      expect(runningmovie.name).to.equal('New Runningmovie');
      expect(runningmovie.info).to.equal('This is the brand new runningmovie!!!');
    });

  });

  describe('PUT /api/runningmovies/:id', function() {
    var updatedRunningmovie;

    beforeEach(function(done) {
      request(app)
        .put('/api/runningmovies/' + newRunningmovie._id)
        .send({
          name: 'Updated Runningmovie',
          info: 'This is the updated runningmovie!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRunningmovie = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRunningmovie = {};
    });

    it('should respond with the updated runningmovie', function() {
      expect(updatedRunningmovie.name).to.equal('Updated Runningmovie');
      expect(updatedRunningmovie.info).to.equal('This is the updated runningmovie!!!');
    });

  });

  describe('DELETE /api/runningmovies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/runningmovies/' + newRunningmovie._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when runningmovie does not exist', function(done) {
      request(app)
        .delete('/api/runningmovies/' + newRunningmovie._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
