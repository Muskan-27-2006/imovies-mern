const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  selectedSeats: [String],
  totalAmount: { type: Number, required: true },
  bookingStatus: { type: String, default: "Confirmed" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);