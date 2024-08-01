const express = require("express");
const {
  sendVerificationCode,
  verifyCode,
  checkUser,
  completeProfile,
  getCurrentUser,
} = require("../controllers/authController");
const { seedData } = require("../controllers/mockDataController");

const router = express.Router();

router.post("/send-verification", sendVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/check-user", checkUser);
router.post("/complete-profile", completeProfile);
router.post("/current-user", getCurrentUser);
router.post("/seed-data", seedData);

module.exports = router;
