import React from 'react';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`p-4 sm:p-6 ${isDarkMode ? 'bg-[#242B42]' : 'bg-white'} rounded-xl shadow-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Settings</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm sm:text-base">Dark Mode</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-checked:bg-[#FF5733] rounded-full peer-focus:ring-2 peer-focus:ring-[#FF5733] transition-colors"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  );
};

export default Settings;