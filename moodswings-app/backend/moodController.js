const Mood = require('./moodModel');

// Add a new mood log
async function addMoodLog(req, res) {
  const { entry, moods, weather } = req.body;
  const userId = req.userId; // Decoded from token middleware

  try {
    const newMood = new Mood({ userId, entry, moods, weather });
    await newMood.save();
    res.status(201).json({ message: 'Mood log added successfully!', mood: newMood });
  } catch (error) {
    console.error('Error adding mood log:', error);
    res.status(500).json({ message: 'Failed to add mood log.', error });
  }
}

// Get all mood logs for the logged-in user
async function getMoodLogs(req, res) {
  const userId = req.userId; // Decoded from token middleware

  try {
    const moods = await Mood.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json(moods);
  } catch (error) {
    console.error('Error fetching mood logs:', error);
    res.status(500).json({ message: 'Failed to fetch mood logs.', error });
  }
}

module.exports = { addMoodLog, getMoodLogs };
