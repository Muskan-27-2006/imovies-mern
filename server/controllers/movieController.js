const Movie = require("../models/movieModel");

// Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new movie
const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMovies, addMovie };
