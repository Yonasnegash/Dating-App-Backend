const User = require("../models/User");

exports.likeUser = async (req, res) => {
  const { userId, currentUserId } = req.body; // ID of the user to be liked
  //   const currentUserId = req.user._id; // Assuming the user ID is added to req.user in your authentication middleware
  //   console.log(req.body);
  //   console.log(req.user);
  try {
    const currentUser = await User.findById(currentUserId);
    const likedUser = await User.findById(userId);

    if (!likedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked" });
    }

    currentUser.likes.push(userId);
    await currentUser.save();
    likedUser.likes.push(currentUserId);
    await likedUser.save();

    res.status(200).json({ message: "User liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
