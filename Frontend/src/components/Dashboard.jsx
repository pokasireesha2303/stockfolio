import { useState, useEffect } from 'react';
import { getStocks } from '../services/stockService';
import StockForm from './StockForm';
import StockList from './StockList';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    try {
      const data = await getStocks();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const chartData = {
    labels: stocks.map((s) => s.symbol),
    datasets: [
      {
        data: stocks.map((s) => s.quantity * s.buyPrice),
        backgroundColor: [
          '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899',
        ],
      },
    ],
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Stock Portfolio</h1>

      <StockForm onStockAdded={fetchStocks} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <StockList stocks={stocks} onStockDeleted={fetchStocks} />

        {stocks.length > 0 && (
          <div className="max-w-xs">
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;