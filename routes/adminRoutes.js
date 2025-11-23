const express = require('express');
const router = express.Router();
const { registerAdmin, authAdmin } = require('../controllers/adminController');

router.post('/register', registerAdmin);
router.post('/login', authAdmin);

module.exports = router;
