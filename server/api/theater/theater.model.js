'use strict';

import mongoose from 'mongoose';

var TheaterSchema = new mongoose.Schema({
  Cine: String,
  City: String
});

export default mongoose.model('Theater', TheaterSchema);
