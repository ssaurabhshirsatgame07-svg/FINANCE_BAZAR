const express = require('express');
const {
  uploadKycDocuments,
  getKycStatus,
  verifyKyc,
  getAllKyc
} = require('../controllers/kycController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Set up multer for document uploads
const documentUpload = upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadhaarFront', maxCount: 1 },
  { name: 'aadhaarBack', maxCount: 1 },
  { name: 'bankStatement', maxCount: 1 },
  { name: 'salarySlip', maxCount: 1 }
]);

router.post('/upload', protect, documentUpload, uploadKycDocuments);
router.get('/status', protect, getKycStatus);
router.put('/verify/:id', protect, authorize('admin'), verifyKyc);
router.get('/', protect, authorize('admin'), getAllKyc);

module.exports = router;