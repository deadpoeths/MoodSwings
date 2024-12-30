const express = require("express");
const cors = require("cors");
app.use(cors({ origin: "https://moodswings.vercel.app/" }));
require("dotenv").config();
const connectToDatabase = require("./mongoClient");
const authRoutes = require("./Routes/authRoutes");
const moodRoutes = require("./Routes/moodRoutes");
const PORT = process.env.PORT || 3000 

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes); // Add mood logging routes

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
