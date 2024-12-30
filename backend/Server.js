const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./mongoClient");
const authRoutes = require("./Routes/authRoutes");
const moodRoutes = require("./Routes/moodRoutes");

const app = express();

// Use the deployed frontend URL for CORS
app.use(cors({ origin: "https://moodswings.vercel.app" }));
app.use(express.json());

// Connect to the database
connectToDatabase();

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);

// Use dynamic port assignment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
