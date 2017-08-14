/**
 * Runningmovie model events
 */

'use strict';

import {EventEmitter} from 'events';
import Runningmovie from './runningmovie.model';
var RunningmovieEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RunningmovieEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Runningmovie.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RunningmovieEvents.emit(event + ':' + doc._id, doc);
    RunningmovieEvents.emit(event, doc);
  }
}

export default RunningmovieEvents;
