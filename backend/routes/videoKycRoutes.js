const express = require('express');
const {
  scheduleVideoKyc,
  verifyVideoKyc
} = require('../controllers/videoKycController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.post('/schedule', protect, scheduleVideoKyc);
router.put('/:sessionId/verify', protect, authorize('admin'), verifyVideoKyc);

module.exports = router;