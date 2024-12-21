const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  entry: { type: String, required: true }, // Journal entry
  moods: { type: [Number], required: true }, // Array of emoji IDs
  weather: { type: Number, required: true }, // Weather ID
  timestamp: { type: Date, default: Date.now }, // Date of the mood log
});

module.exports = mongoose.model('Mood', MoodSchema);
