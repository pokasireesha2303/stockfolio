const Stock = require('../models/Stock');

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStock = async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStock = async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stock deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStocks, addStock, deleteStock };