const Groq = require('groq-sdk');

const getPortfolioInsights = async (req, res) => {
  try {
    const { stocks } = req.body;

    if (!stocks || stocks.length === 0) {
      return res.status(400).json({ message: 'No stocks provided' });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const portfolioSummary = stocks.map((stock) => {
      const invested = stock.quantity * stock.buyPrice;
      const current = stock.quantity * (stock.currentPrice || stock.buyPrice);
      const profitLoss = current - invested;
      const profitLossPercent = ((profitLoss / invested) * 100).toFixed(2);
      return `${stock.symbol}: ${stock.quantity} units, bought at $${stock.buyPrice}, current price $${stock.currentPrice || 'N/A'}, P&L: ${profitLossPercent}%`;
    }).join('\n');

    const prompt = `You are a financial advisor analyzing a stock portfolio. Here are the holdings:

${portfolioSummary}

Please provide:
1. A brief portfolio summary (2-3 sentences)
2. Top strength of this portfolio
3. Main risk or weakness
4. One specific actionable recommendation

Keep your response concise, friendly, and under 150 words.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
    });

    const text = completion.choices[0].message.content;
    res.json({ insights: text });

  } catch (error) {
    console.error('Groq error:', error.message);
    res.status(500).json({ message: 'Failed to get AI insights', error: error.message });
  }
};

module.exports = { getPortfolioInsights };