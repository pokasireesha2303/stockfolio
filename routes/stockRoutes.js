const express = require('express');
const router = express.Router();
const { getStocks, addStock, deleteStock } = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getStocks);
router.post('/', protect, addStock);
router.delete('/:id', protect, deleteStock);

module.exports = router;