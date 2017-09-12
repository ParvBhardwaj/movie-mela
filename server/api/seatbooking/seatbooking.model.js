'use strict';

import mongoose from 'mongoose';

var SeatbookingSchema = new mongoose.Schema({
  movie: String,
  city: String,
  cine: String,
  date: String,
  time: String,
  selectedSeats: [String]
});

export default mongoose.model('Seatbooking', SeatbookingSchema);
