const User = require("../models/User");
const mongoose = require("mongoose");

/**
 * Matching algorithm to find and update matches for users.
 * This algorithm matches users based on criteria such as age, interests, lifestyle, and opposite gender.
 */
exports.matchUsers = async () => {
  try {
    const users = await User.find();

    const ageDifference = 5; // Example age difference criteria

    const userPromises = users.map(async (user) => {
      const potentialMatches = users.filter((potentialMatch) => {
        if (user._id.equals(potentialMatch._id)) return false;

        // Check for opposite gender
        if (
          user.profile.personalInformation.gender ===
          potentialMatch.profile.personalInformation.gender
        )
          return false;

        const userAge =
          new Date().getFullYear() -
          user.profile.personalInformation.dateOfBirth.getFullYear();
        const matchAge =
          new Date().getFullYear() -
          potentialMatch.profile.personalInformation.dateOfBirth.getFullYear();

        // Check age difference
        if (Math.abs(userAge - matchAge) > ageDifference) return false;

        // Check common interests (example: hobbies)
        const commonInterests = user.profile.interests.hobbies.filter((hobby) =>
          potentialMatch.profile.interests.hobbies.includes(hobby)
        );

        if (commonInterests.length === 0) return false;

        // Check similar lifestyle choices (example: smoking)
        if (
          user.profile.lifestyle.smoking !==
          potentialMatch.profile.lifestyle.smoking
        )
          return false;

        // Add more criteria checks as needed

        return true;
      });

      // Update the matches field for the user
      user.matches = potentialMatches.map((match) => match._id);
      await user.save(); // Save asynchronously
    });

    // Wait for all user updates to complete
    await Promise.all(userPromises);

    console.log("Matching process completed successfully.");
  } catch (error) {
    console.error("Error matching users:", error);
  }
};

// const User = require("../models/User");

// /**
//  * Matching algorithm to find and update matches for users.
//  * This algorithm matches users based on criteria such as age, interests, lifestyle, and opposite gender.
//  */
// exports.matchUsers = async () => {
//   try {
//     const users = await User.find();

//     const ageDifference = 5; // Example age difference criteria

//     for (const user of users) {
//       const potentialMatches = users.filter((potentialMatch) => {
//         if (user._id.equals(potentialMatch._id)) return false;

//         // Check for opposite gender
//         if (
//           user.profile.personalInformation.gender ===
//           potentialMatch.profile.personalInformation.gender
//         )
//           return false;

//         const userAge =
//           new Date().getFullYear() -
//           user.profile.personalInformation.dateOfBirth.getFullYear();
//         const matchAge =
//           new Date().getFullYear() -
//           potentialMatch.profile.personalInformation.dateOfBirth.getFullYear();

//         // Check age difference
//         if (Math.abs(userAge - matchAge) > ageDifference) return false;

//         // Check common interests (example: hobbies)
//         const commonInterests = user.profile.interests.hobbies.filter((hobby) =>
//           potentialMatch.profile.interests.hobbies.includes(hobby)
//         );

//         if (commonInterests.length === 0) return false;

//         // Check similar lifestyle choices (example: smoking)
//         if (
//           user.profile.lifestyle.smoking !==
//           potentialMatch.profile.lifestyle.smoking
//         )
//           return false;

//         // Add more criteria checks as needed

//         return true;
//       });

//       // Update the matches field for the user
//       user.matches = potentialMatches.map((match) => match._id);
//       await user.save();
//     }
//   } catch (error) {
//     console.error("Error matching users:", error);
//   }
// };
