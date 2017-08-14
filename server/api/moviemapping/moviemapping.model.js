'use strict';

import mongoose from 'mongoose';

var MoviemappingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Moviemapping', MoviemappingSchema);
