const express = require('express');
const router = express.Router();
const { getStocks, addStock, deleteStock } = require('../controllers/stockController');

router.get('/', getStocks);
router.post('/', addStock);
router.delete('/:id', deleteStock);

module.exports = router;