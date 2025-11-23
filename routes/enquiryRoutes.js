const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, deleteEnquiry } = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createEnquiry).get(protect, getEnquiries);
router.route('/:id').delete(protect, deleteEnquiry);

module.exports = router;
