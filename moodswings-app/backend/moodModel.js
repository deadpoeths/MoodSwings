const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  entry: { type: String, required: true }, // Journal entry
  moods: { type: [String], required: true }, // List of selected moods (emoji IDs or names)
  weather: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now }, // Date of the mood log
});

module.exports = mongoose.model('Mood', MoodSchema);
