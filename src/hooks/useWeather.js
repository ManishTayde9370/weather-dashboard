import { useState } from 'react';

const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      // Current weather
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      
      // 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found. Try "City,Country" format.');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      
      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return { currentWeather, forecast, loading, error, fetchWeather };
};

export default useWeather;