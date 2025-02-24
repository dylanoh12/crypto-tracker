import React, { useState, useEffect } from 'react';
import PriceCard from './components/PriceCard';
import Chart from './components/Chart';
import Portfolio from './components/Portfolio';
import Settings from './components/Settings';
import { getCryptoData, getHistoricalData } from './api';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchData = async () => {
    const data = await getCryptoData();
    setCryptoData(data);
  };

  useEffect(() => {
    fetchData();
    const btcHistory = async () => {
      const history = await getHistoricalData('bitcoin', 7);
      setChartData(history);
    };
    btcHistory();

    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const filteredCoins = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#1A1F2F]' : 'bg-gray-100'} flex flex-col md:flex-row`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 ${isDarkMode ? 'bg-[#242B42]' : 'bg-white'} p-6 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        <h2
          className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}
        >
          Crypto Tracker
        </h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${
              activeView === 'dashboard'
                ? `${isDarkMode ? 'text-[#FF5733]' : 'text-[#FF5733]'} font-semibold`
                : `${isDarkMode ? 'text-gray-400' : 'text-gray-700'} hover:${isDarkMode ? 'text-[#FF5733]' : 'text-[#FF5733]'}`
            }`}
            onClick={() => {
              setActiveView('dashboard');
              setIsSidebarOpen(false);
            }}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer ${
              activeView === 'portfolio'
                ? `${isDarkMode ? 'text-[#FF5733]' : 'text-[#FF5733]'} font-semibold`
                : `${isDarkMode ? 'text-gray-400' : 'text-gray-700'} hover:${isDarkMode ? 'text-[#FF5733]' : 'text-[#FF5733]'}`
            }`}
            onClick={() => {
              setActiveView('portfolio');
              setIsSidebarOpen(false);
            }}
          >
            Portfolio
          </li>
          <li
            className={`cursor-pointer ${
              activeView === 'settings'
                ? `${isDarkMode ? 'text-[#FF5733]' : 'text-[#FF5733]'} font-semibold`
                : `${isDarkMode ? 'text-gray-400' : 'text-gray-700'} hover:${isDarkMode ? 'text-[#FF5733]' : 'text-[#FF5733]'}`
            }`}
            onClick={() => {
              setActiveView('settings');
              setIsSidebarOpen(false);
            }}
          >
            Settings
          </li>
        </ul>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <button
          className={`md:hidden p-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} focus:outline-none mb-4`}
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {activeView === 'dashboard' ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-0`}>
                Dashboard
              </h1>
              <input
                type="text"
                placeholder="Search coins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#242B42] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-[#FF5733] w-full sm:w-64`}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCoins.map((coin) => (
                <PriceCard
                  key={coin.id}
                  name={coin.name}
                  price={coin.current_price}
                  change24h={coin.price_change_percentage_24h}
                  marketCap={coin.market_cap}
                  isDarkMode={isDarkMode} // Pass isDarkMode here
                />
              ))}
            </div>
            <div className={`mt-6 md:mt-10 ${isDarkMode ? 'bg-[#242B42]' : 'bg-white'} p-4 md:p-6 rounded-xl shadow-lg`}>
              <h2 className={`text-lg md:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Bitcoin Price (7 Days)
              </h2>
              <div className="h-64">
                <Chart data={chartData} />
              </div>
            </div>
          </>
        ) : activeView === 'portfolio' ? (
          <Portfolio cryptoData={cryptoData} isDarkMode={isDarkMode} />
        ) : (
          <Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        )}
      </div>
    </div>
  );
}

export default App;