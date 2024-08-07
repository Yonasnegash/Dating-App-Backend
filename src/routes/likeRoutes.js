const express = require("express");
const { likeUser } = require("../controllers/likeController");

const router = express.Router();

router.post("/like-user", likeUser);

module.exports = router;
