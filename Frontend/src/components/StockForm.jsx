import { useState } from 'react';
import { addStock } from '../services/stockService';

function StockForm({ onStockAdded }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStock({
        symbol,
        quantity: Number(quantity),
        buyPrice: Number(buyPrice),
      });
      setSymbol('');
      setQuantity('');
      setBuyPrice('');
      onStockAdded();
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-50 rounded-lg">
      <input
        type="text"
        placeholder="Symbol (e.g. AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border rounded px-3 py-2 w-32"
        required
      />
      <input
        type="number"
        placeholder="Buy Price"
        value={buyPrice}
        onChange={(e) => setBuyPrice(e.target.value)}
        className="border rounded px-3 py-2 w-32"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Stock
      </button>
    </form>
  );
}

export default StockForm;