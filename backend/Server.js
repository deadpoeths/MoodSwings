const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./mongoClient");
const authRoutes = require("./Routes/authRoutes");
const moodRoutes = require("./Routes/moodRoutes");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes); // Add mood logging routes

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
