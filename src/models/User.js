// src/models/User.js
const mongoose = require("mongoose");

const PersonalInformationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  location: { type: String },
  occupation: { type: String },
  educationalLevel: { type: String },
  ethnicity: { type: String },
  religion: { type: String },
  languagesSpoken: [{ type: String }],
});

const PhysicalAttributesSchema = new mongoose.Schema({
  height: { type: Number },
  weight: { type: Number },
  bodyType: { type: String },
});

const LifestyleSchema = new mongoose.Schema({
  smoking: { type: String },
  drinking: { type: String },
  exercise: { type: String },
  diet: { type: String },
});

const InterestsSchema = new mongoose.Schema({
  favoriteSports: [String],
  hobbies: [String],
  musicGenres: [String],
  travelPreferences: [String],
  culturalInterests: [String],
  communicationStyles: [String],
  relationshipGoals: [String],
});

const ProfileSchema = new mongoose.Schema({
  personalInformation: PersonalInformationSchema,
  physicalAtribute: PhysicalAttributesSchema,
  interests: InterestsSchema,
  lifestyle: LifestyleSchema,
});

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    isPinSetup: { type: Boolean, default: false },
    pin: {  type: String},
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    profile: ProfileSchema,
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    profilePictureUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
