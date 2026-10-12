const express = require('express');
const router = express.Router();
const {
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequestById,
  updateHelpRequest,
  deleteHelpRequest,
} = require('../controllers/helpRequestController');

router.post('/', createHelpRequest);
router.get('/', getAllHelpRequests);
router.get('/:id', getHelpRequestById);
router.put('/:id', updateHelpRequest);
router.delete('/:id', deleteHelpRequest);

module.exports = router;
