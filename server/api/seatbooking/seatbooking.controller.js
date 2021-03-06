/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/seatbookings              ->  index
 * POST    /api/seatbookings              ->  create
 * GET     /api/seatbookings/:id          ->  show
 * PUT     /api/seatbookings/:id          ->  update
 * DELETE  /api/seatbookings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Seatbooking from './seatbooking.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

//'/booked/:date/:time/:cine/:movie'
export function show2(req, res) {
  console.log(req.params.date);
  console.log(req.params.time);
  console.log(req.params.cine);
  console.log(req.params.movie);

  return Seatbooking.findOne({
    'date': req.params.date,
    'time': req.params.time,
    'cine': req.params.cine,
    'movie': req.params.movie
  }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Seatbookings
export function index(req, res) {
  return Seatbooking.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Seatbooking from the DB
export function show(req, res) {
  return Seatbooking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Seatbooking in the DB
export function create(req, res) {

  console.log("creating seatbooking");
  console.log(req.body);
  
  return Seatbooking.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Seatbooking in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Seatbooking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Seatbooking from the DB
export function destroy(req, res) {
  return Seatbooking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
