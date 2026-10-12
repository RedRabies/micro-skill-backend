const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActivityAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Streak', streakSchema);
