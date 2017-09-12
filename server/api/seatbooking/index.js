'use strict';

var express = require('express');
var controller = require('./seatbooking.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

// GET date/ time/ theater/ movie/
router.get('/booked/:date/:time/:cine/:movie', controller.show2);


module.exports = router;
