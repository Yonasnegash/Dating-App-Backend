const express = require("express");
const {
  sendVerificationCode,
  verifyCode,
  checkUser,
  completeProfile,
  getCurrentUser,
} = require("../controllers/authController");
const { seedData } = require("../controllers/mockDataController");
const upload = require("../config/multerConfig");

const router = express.Router();

router.post("/send-verification", sendVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/check-user", checkUser);
router.post(
  "/complete-profile",
  upload.single("profilePicture"),
  completeProfile
);
router.post("/current-user", getCurrentUser);
router.post("/seed-data", seedData);

module.exports = router;
