const express = require("express");
const router = express.Router();
const { getMovies, addMovie } = require("../controllers/movieController");

router.get("/get-all-movies", getMovies);
router.post("/add-movie", addMovie);

module.exports = router;
