// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const { createActivity } = require('../controllers/activityController');
const { verifyToken } = require('../middleware/authMiddleware'); // optional if protected

// Add new activity (you can make this admin-only if needed)
router.post('/add', verifyToken, createActivity);

module.exports = router;
