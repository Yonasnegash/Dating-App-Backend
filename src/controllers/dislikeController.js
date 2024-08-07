const User = require("../models/User");

exports.dislikeUser = async (req, res) => {
  const { userId } = req.body; // ID of the user to be disliked
  const currentUserId = req.user._id; // Assuming the user ID is added to req.user in your authentication middleware

  try {
    const currentUser = await User.findById(currentUserId);
    const dislikedUser = await User.findById(userId);

    if (!dislikedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.dislikes.includes(userId)) {
      return res.status(400).json({ message: "User already disliked" });
    }

    currentUser.dislikes.push(userId);
    await currentUser.save();

    res.status(200).json({ message: "User disliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
