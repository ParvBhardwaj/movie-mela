/**
 * Moviemapping model events
 */

'use strict';

import {EventEmitter} from 'events';
import Moviemapping from './moviemapping.model';
var MoviemappingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviemappingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Moviemapping.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviemappingEvents.emit(event + ':' + doc._id, doc);
    MoviemappingEvents.emit(event, doc);
  }
}

export default MoviemappingEvents;
