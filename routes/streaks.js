const express = require('express');
const router = express.Router();
const { getAllStreaks, getStreakByUserId, updateStreak } = require('../controllers/streakController');

router.get('/', getAllStreaks);
router.get('/:userId', getStreakByUserId);
router.put('/:userId', updateStreak);

module.exports = router;
