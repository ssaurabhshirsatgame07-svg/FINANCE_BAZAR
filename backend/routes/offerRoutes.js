const express = require('express');
const {
  getOffers,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  getPersonalizedOffers
} = require('../controllers/offerController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getOffers)
  .post(protect, authorize('admin'), createOffer);

router.get('/personalized', protect, getPersonalizedOffers);

router.route('/:id')
  .get(getOffer)
  .put(protect, authorize('admin'), updateOffer)
  .delete(protect, authorize('admin'), deleteOffer);

module.exports = router;