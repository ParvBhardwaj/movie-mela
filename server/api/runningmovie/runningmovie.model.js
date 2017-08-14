'use strict';

import mongoose from 'mongoose';

var RunningmovieSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Runningmovie', RunningmovieSchema);
