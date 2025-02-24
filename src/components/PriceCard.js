import React from 'react';

const PriceCard = ({ name, price, change24h, marketCap, isDarkMode }) => {
  return (
    <div className={`p-4 sm:p-6 ${isDarkMode ? 'bg-[#242B42] text-white' : 'bg-white text-gray-900'} rounded-xl shadow-lg hover:shadow-xl transition-shadow`}>
      <h3 className="text-base sm:text-lg font-semibold truncate">{name}</h3>
      <p className="text-xl sm:text-2xl font-bold text-[#FF5733] mt-2">${price.toLocaleString()}</p>
      <div className="flex flex-col sm:flex-row justify-between mt-2 sm:mt-4 text-xs sm:text-sm">
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          24h:{' '}
          <span className={change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
            {change24h.toFixed(2)}%
          </span>
        </p>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>Market Cap: ${marketCap.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PriceCard;