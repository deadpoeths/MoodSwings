const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./mongoClient");
const authRoutes = require("./Routes/authRoutes");
const moodRoutes = require("./Routes/moodRoutes");

const app = express();

const corsOptions = {
    origin: "https://moodswings.vercel.app",
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
