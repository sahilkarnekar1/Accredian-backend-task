const express = require('express');
const router = express.Router();
const { createRefer, getAllRefers } = require('../controllers/referController');

// Create a new refer
router.post('/', createRefer);

// Get all refers
router.get('/', getAllRefers);

module.exports = router;
