const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes");
const showRoutes = require("./routes/showRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favouriteRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/theatre", theatreRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("iMovies API server running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});