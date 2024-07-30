const User = require('../models/User');
const twilio = require('twilio');

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTHTOKEN);

exports.sendVerificationCode = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const verification = await client.verify.v2
      .services(process.env.SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: 'sms' });

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

    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phoneNumber });

      if (!user) {
        user = new User({ phoneNumber, isVerified: true });
        await user.save();
        res.status(200).send({ message: 'Verification successful', isVerified: true, isRegistered: false });
      } else {
        user.isVerified = true;
        await user.save();
        res.status(200).send({ message: 'Verification successful', isVerified: true, isRegistered: !!user.profile });
      }
    } else {
      res.status(400).send({ message: 'Invalid verification code' });
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
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.completeProfile = async (req, res) => {
  const { phoneNumber, profile } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { profile, isVerified: true },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: 'Profile completed', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
