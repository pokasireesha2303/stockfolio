import { deleteStock } from '../services/stockService';

function StockList({ stocks, onStockDeleted }) {
  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      onStockDeleted();
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <table className="w-full mt-4 border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Symbol</th>
          <th className="p-2">Quantity</th>
          <th className="p-2">Buy Price</th>
          <th className="p-2">Purchase Date</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock._id} className="border-b">
            <td className="p-2 font-medium">{stock.symbol}</td>
            <td className="p-2">{stock.quantity}</td>
            <td className="p-2">${stock.buyPrice}</td>
            <td className="p-2">
              {new Date(stock.purchaseDate).toLocaleDateString()}
            </td>
            <td className="p-2">
              <button
                onClick={() => handleDelete(stock._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockList;