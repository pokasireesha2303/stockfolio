const Stock = require('../models/Stock');
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance();

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

const getPortfolioWithLivePrices = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user._id });

    const enrichedStocks = await Promise.all(
      stocks.map(async (stock) => {
        try {
          const quote = await yahooFinance.quote(stock.symbol);
          const currentPrice = quote.regularMarketPrice;
          const investedValue = stock.quantity * stock.buyPrice;
          const currentValue = stock.quantity * currentPrice;
          const profitLoss = currentValue - investedValue;
          const profitLossPercent = (profitLoss / investedValue) * 100;

          return {
            ...stock.toObject(),
            currentPrice,
            currentValue,
            profitLoss,
            profitLossPercent,
          };
        } catch (err) {
          console.log('Yahoo Finance error for', stock.symbol, ':', err.message);
          return {
            ...stock.toObject(),
            currentPrice: null,
            error: 'Price not found',
          };
        }
      })
    );

    res.json(enrichedStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSymbols = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    const results = await yahooFinance.search(q);
    const formatted = results.quotes
      .filter((item) => item.symbol)
      .map((item) => ({
        symbol: item.symbol,
        name: item.shortname || item.longname || '',
        type: item.quoteType || '',
      }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStocks, addStock, deleteStock, getPortfolioWithLivePrices, searchSymbols };