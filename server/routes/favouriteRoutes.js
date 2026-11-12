const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.send("Favourite route working"));

module.exports = router;