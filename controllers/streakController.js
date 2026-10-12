const Streak = require('../models/Streak');

exports.getAllStreaks = async (req, res) => {
  try {
    const streaks = await Streak.find().sort({ longestStreak: -1 });
    res.status(200).json({ success: true, data: streaks, count: streaks.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getStreakByUserId = async (req, res) => {
  try {
    const streak = await Streak.findOne({ userId: req.params.userId });
    if (!streak) {
      return res.status(404).json({ success: false, error: 'No streak found for this user' });
    }
    res.status(200).json({ success: true, data: streak });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateStreak = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentStreak, longestStreak } = req.body;
    let streak = await Streak.findOne({ userId });
    if (!streak) {
      streak = new Streak({
        userId,
        currentStreak: currentStreak ?? 0,
        longestStreak: longestStreak ?? 0,
        lastActivityAt: new Date(),
      });
    } else {
      if (currentStreak !== undefined) streak.currentStreak = currentStreak;
      if (longestStreak !== undefined) streak.longestStreak = longestStreak;
      streak.lastActivityAt = new Date();
    }
    await streak.save();
    res.status(200).json({ success: true, data: streak });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
