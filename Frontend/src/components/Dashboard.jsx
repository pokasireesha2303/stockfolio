import { useState, useEffect } from 'react';
import { getLiveStocks } from '../services/stockService';
import { getPortfolioInsights } from '../services/aiService';
import StockForm from './StockForm';
import StockList from './StockList';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [insights, setInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState('');

  const fetchStocks = async () => {
    try {
      const data = await getLiveStocks();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleGetInsights = async () => {
    setLoadingInsights(true);
    setInsightsError('');
    try {
      const data = await getPortfolioInsights(stocks);
      setInsights(data.insights);
    } catch (error) {
      setInsightsError('Failed to get AI insights. Please try again.');
      console.error('Error fetching insights:', error);
    } finally {
      setLoadingInsights(false);
    }
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 overflow-x-auto">
          <StockList stocks={stocks} onStockDeleted={fetchStocks} />
        </div>

        {stocks.length > 0 && (
          <div className="max-w-xs mx-auto">
            <Pie data={chartData} />
          </div>
        )}
      </div>

      {stocks.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">AI Portfolio Insights</h2>
            <button
              onClick={handleGetInsights}
              disabled={loadingInsights}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loadingInsights ? 'Analyzing...' : 'Get AI Insights'}
            </button>
          </div>
          {insightsError && <p className="text-red-500">{insightsError}</p>}
          {insights && <p className="whitespace-pre-line text-gray-700">{insights}</p>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;