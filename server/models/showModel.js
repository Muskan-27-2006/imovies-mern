const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre", required: true },
  showtime: { type: String, required: true },
  date: { type: Date, required: true },
  lowerSeatPrice: { type: Number, required: true },
  middleSeatPrice: { type: Number, required: true },
  balconySeatPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);