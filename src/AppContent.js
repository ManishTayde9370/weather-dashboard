import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';
import useWeather from './hooks/useWeather';

const AppContent = () => {
  const { currentWeather, forecast, loading, error, fetchWeather } = useWeather();
  const [searchHistory, setSearchHistory] = useState([]);
  const { darkMode } = useTheme();

  const handleSearch = (city) => {
    fetchWeather(city);
    setSearchHistory(prev => [city, ...prev.filter(item => item !== city)].slice(0, 5));
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <ThemeToggle />
      <div className="container">
        <h1 className="app-title">Weather Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
        
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        
        {currentWeather && (
          <>
            <WeatherCard data={currentWeather} />
            <ForecastCard forecast={forecast} />
          </>
        )}
        
        {searchHistory.length > 0 && (
          <div className="search-history">
            <h3>Recent Searches</h3>
            <div className="history-items">
              {searchHistory.map((city, index) => (
                <button 
                  key={index} 
                  onClick={() => handleSearch(city)}
                  className="history-item"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppContent;