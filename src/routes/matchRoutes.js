const express = require("express");
const { matchUsers } = require("../controllers/matchingEngineController");

const router = express.Router();

router.post("/match-users", matchUsers);

module.exports = router;
