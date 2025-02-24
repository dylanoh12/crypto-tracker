import React, { useState } from 'react';

const Portfolio = ({ cryptoData, isDarkMode }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [coinAmount, setCoinAmount] = useState('');

  const handleAddCoin = (e) => {
    e.preventDefault();
    if (!selectedCoin || !coinAmount) return;

    const coin = cryptoData.find((c) => c.id === selectedCoin);
    if (coin) {
      setPortfolio([...portfolio, { name: coin.name, amount: parseFloat(coinAmount) }]);
      setSelectedCoin('');
      setCoinAmount('');
    }
  };

  const calculateTotalValue = () => {
    return portfolio.reduce((total, item) => {
      const coin = cryptoData.find((c) => c.name === item.name);
      return total + (coin ? coin.current_price * item.amount : 0);
    }, 0);
  };

  return (
    <div className={`p-4 sm:p-6 ${isDarkMode ? 'bg-[#242B42]' : 'bg-white'} rounded-xl shadow-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Portfolio</h2>

      <form onSubmit={handleAddCoin} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#1A1F2F] text-white border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-[#FF5733] w-full sm:flex-1`}
          >
            <option value="" disabled>Select a coin</option>
            {cryptoData.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={coinAmount}
            onChange={(e) => setCoinAmount(e.target.value)}
            step="any"
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#1A1F2F] text-white border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-[#FF5733] w-full sm:w-32`}
          />
          <button
            type="submit"
            className="p-2 bg-[#FF5733] text-white rounded-lg hover:bg-[#e04e2d] transition-colors w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      </form>

      {portfolio.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <th className="pb-2 pr-2">Coin</th>
                <th className="pb-2 pr-2">Amount</th>
                <th className="pb-2 pr-2">Price (USD)</th>
                <th className="pb-2">Value (USD)</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => {
                const coin = cryptoData.find((c) => c.name === item.name);
                const price = coin ? coin.current_price.toLocaleString() : 'N/A';
                const value = coin ? (coin.current_price * item.amount).toLocaleString() : 'N/A';
                return (
                  <tr key={index} className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                    <td className="py-2 pr-2 truncate">{item.name}</td>
                    <td className="py-2 pr-2">{item.amount}</td>
                    <td className="py-2 pr-2">${price}</td>
                    <td className="py-2 text-[#FF5733]">${value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-base sm:text-lg font-bold">
            Total Value: <span className="text-[#FF5733]">${calculateTotalValue().toLocaleString()}</span>
          </p>
        </div>
      ) : (
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>Add coins to see your portfolio!</p>
      )}
    </div>
  );
};

export default Portfolio;