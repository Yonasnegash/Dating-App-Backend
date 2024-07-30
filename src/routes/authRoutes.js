const express = require("express");
const {
  sendVerificationCode,
  verifyCode,
  checkUser,
  completeProfile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/send-verification", sendVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/check-user", checkUser);
router.post("/complete-profile", completeProfile);

module.exports = router;
