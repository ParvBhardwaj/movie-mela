'use strict';

import mongoose from 'mongoose';

var TheaterSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Theater', TheaterSchema);
