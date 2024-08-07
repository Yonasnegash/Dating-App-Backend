const express = require("express");
const { dislikeUser } = require("../controllers/dislikeController");

const router = express.Router();

router.post("/dislike-user", dislikeUser);

module.exports = router;
