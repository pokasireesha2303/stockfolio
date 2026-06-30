import { useState, useEffect, useRef } from 'react';
import { addStock, searchSymbols } from '../services/stockService';

function StockForm({ onStockAdded }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

  const handleSymbolChange = (e) => {
    const value = e.target.value;
    setSymbol(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchSymbols(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error searching symbols:', error);
      }
    }, 400);
  };

  const handleSelectSuggestion = (item) => {
    setSymbol(item.symbol);
    setSuggestions([]);
    setShowSuggestions(false);
  };

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
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-50 rounded-lg relative">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Symbol (e.g. AAPL or bitcoin)"
          value={symbol}
          onChange={handleSymbolChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="border rounded px-3 py-2 w-full"
          required
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
            {suggestions.map((item, index) => (
              <li
                key={`${item.symbol}-${index}`}
                onMouseDown={() => handleSelectSuggestion(item)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <span className="font-semibold">{item.symbol}</span>
                {item.name && <span className="text-gray-500"> — {item.name}</span>}
                {item.type && <span className="text-gray-400 text-xs"> ({item.type})</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
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