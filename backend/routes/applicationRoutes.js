const express = require('express');
const {
  createApplication,
  getUserApplications,
  getApplication,
  updateApplicationStatus,
  getAllApplications
} = require('../controllers/applicationController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Set up multer for document uploads
const documentUpload = upload.fields([
  { name: 'documents', maxCount: 10 }
]);

router.route('/')
  .post(protect, documentUpload, createApplication);

router.get('/user', protect, getUserApplications);
router.get('/admin', protect, authorize('admin'), getAllApplications);

router.route('/:id')
  .get(protect, getApplication);

router.put('/:id/status', protect, authorize('admin'), updateApplicationStatus);

module.exports = router;