'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviemapping;

describe('Moviemapping API:', function() {

  describe('GET /api/moviemappings', function() {
    var moviemappings;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviemappings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviemappings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviemappings).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/moviemappings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviemappings')
        .send({
          name: 'New Moviemapping',
          info: 'This is the brand new moviemapping!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMoviemapping = res.body;
          done();
        });
    });

    it('should respond with the newly created moviemapping', function() {
      expect(newMoviemapping.name).to.equal('New Moviemapping');
      expect(newMoviemapping.info).to.equal('This is the brand new moviemapping!!!');
    });

  });

  describe('GET /api/moviemappings/:id', function() {
    var moviemapping;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviemappings/' + newMoviemapping._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviemapping = res.body;
          done();
        });
    });

    afterEach(function() {
      moviemapping = {};
    });

    it('should respond with the requested moviemapping', function() {
      expect(moviemapping.name).to.equal('New Moviemapping');
      expect(moviemapping.info).to.equal('This is the brand new moviemapping!!!');
    });

  });

  describe('PUT /api/moviemappings/:id', function() {
    var updatedMoviemapping;

    beforeEach(function(done) {
      request(app)
        .put('/api/moviemappings/' + newMoviemapping._id)
        .send({
          name: 'Updated Moviemapping',
          info: 'This is the updated moviemapping!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMoviemapping = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviemapping = {};
    });

    it('should respond with the updated moviemapping', function() {
      expect(updatedMoviemapping.name).to.equal('Updated Moviemapping');
      expect(updatedMoviemapping.info).to.equal('This is the updated moviemapping!!!');
    });

  });

  describe('DELETE /api/moviemappings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/moviemappings/' + newMoviemapping._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviemapping does not exist', function(done) {
      request(app)
        .delete('/api/moviemappings/' + newMoviemapping._id)
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
