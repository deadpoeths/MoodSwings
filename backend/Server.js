const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./mongoClient");
const authRoutes = require("./Routes/authRoutes");
const moodRoutes = require("./Routes/moodRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // Development URL
  "https://moodswings.vercel.app", // Production URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

connectToDatabase();


app.get('/',(req, res) => {
    res.json({message: "Test API"})
})

app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes); // Add mood logging routes

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
