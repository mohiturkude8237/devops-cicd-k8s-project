const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Global CORS middleware
app.use(cors({
  origin: "*", // allow all origins
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb:27017/mydb';

function connectWithRetry() {
  console.log('Attempting MongoDB connection...');
  mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection failed. Retrying in 5 seconds...', err.message);
      setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

// User schema & routes (same as before)
const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", UserSchema);

app.post("/add", async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.send("User added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("User not found");
    console.log("Deleted:", result);
    res.send("User deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

app.listen(5000,'0.0.0.0', () => console.log("Server running on port 5000"));
