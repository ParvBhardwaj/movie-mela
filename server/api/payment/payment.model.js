'use strict';

import mongoose from 'mongoose';

var PaymentSchema = new mongoose.Schema({
  cardType: String,
  name: String,
  cardnum: Number,
  cvv: Number,
  exdate: String,
  total: Number
});

export default mongoose.model('Payment', PaymentSchema);
