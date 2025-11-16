const express = require('express');
const {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
  getPartnersByType
} = require('../controllers/partnerController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Set up multer for logo upload
const logoUpload = upload.single('logo');

router.route('/')
  .get(getPartners)
  .post(protect, authorize('admin'), logoUpload, createPartner);

router.route('/:id')
  .get(getPartner)
  .put(protect, authorize('admin'), logoUpload, updatePartner)
  .delete(protect, authorize('admin'), deletePartner);

router.get('/type/:type', getPartnersByType);

module.exports = router;