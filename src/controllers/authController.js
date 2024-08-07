const User = require("../models/User");
const twilio = require("twilio");
const path = require("path");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTHTOKEN);

exports.sendVerificationCode = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const verification = await client.verify.v2
      .services(process.env.SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    res.status(200).send(verification);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.verifyCode = async (req, res) => {
  const { phoneNumber, code } = req.body;

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.SERVICE_SID)
      .verificationChecks.create({ to: phoneNumber, code });

    if (verificationCheck.status === "approved") {
      let user = await User.findOne({ phoneNumber });

      if (!user) {
        user = new User({ phoneNumber, isVerified: true });
        await user.save();
        res.status(200).send({
          message: "Verification successful",
          isVerified: true,
          isRegistered: false,
        });
      } else {
        user.isVerified = true;
        await user.save();
        res.status(200).send({
          message: "Verification successful",
          isVerified: true,
          isRegistered: !!user.profile,
        });
      }
    } else {
      res.status(400).send({ message: "Invalid verification code" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.checkUser = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (user) {
      res.status(200).json({ isRegistered: !!user.profile });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const { phoneNumber, profile } = req.body;

    let profilePictureUrl = "";

    if (req.file) {
      profilePictureUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    const parsedProfile = JSON.parse(profile);

    const updatedProfile = {
      ...parsedProfile,
      profilePictureUrl: profilePictureUrl,
    };
    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { profile: updatedProfile, isVerified: true },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: "Profile completed", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getProfile = async (req, res) => {
  const { userId } = req.user; // Assuming userId is added to req.user in your authentication middleware

  try {
    const user = await User.findById(
      userId,
      "phoneNumber profile.personalInformation.fullname"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber })
      .populate("matches")
      .populate("likes")
      .populate("dislikes");

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
