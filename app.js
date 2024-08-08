require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const matchRoutes = require("./src/routes/matchRoutes");
const likeRoutes = require("./src/routes/likeRoutes");
const dislikeRoutes = require("./src/routes/dislikeRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/matching", matchRoutes);
app.use("/api/liking", likeRoutes);
app.use("/api/liking", dislikeRoutes);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

module.exports = app;
