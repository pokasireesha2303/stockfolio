const express = require('express');
const router = express.Router();
const { getPortfolioInsights } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/insights', protect, getPortfolioInsights);

module.exports = router;