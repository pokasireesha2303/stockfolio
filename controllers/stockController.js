const Stock = require('../models/Stock');

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user._id });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStock = async (req, res) => {
  try {
    const newStock = new Stock({ ...req.body, user: req.user._id });
    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    if (stock.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this stock' });
    }

    await stock.deleteOne();
    res.json({ message: 'Stock deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStocks, addStock, deleteStock };