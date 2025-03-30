import React from 'react';
import '../styles/WeatherCard.css';

const WeatherCard = ({ data, isDaytime }) => {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);

  return (
    <div className={`weather-card ${isDaytime ? 'day' : 'night'}`}>
      <div className="weather-header">
        <h2 className="city-name">{name}, {sys.country}</h2>
        <p className="weather-condition">{weather[0].description}</p>
      </div>
      
      <div className="weather-main">
        <div className="temperature-section">
          <div className="current-temp">{temp}°C</div>
          <div className="feels-like">Feels like {feelsLike}°C</div>
        </div>
        <img src={iconUrl} alt={weather[0].description} className="weather-icon" />
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon humidity"></div>
          <div className="detail-info">
            <div className="detail-value">{main.humidity}%</div>
            <div className="detail-label">Humidity</div>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon wind"></div>
          <div className="detail-info">
            <div className="detail-value">{wind.speed} km/h</div>
            <div className="detail-label">Wind</div>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon pressure"></div>
          <div className="detail-info">
            <div className="detail-value">{main.pressure} hPa</div>
            <div className="detail-label">Pressure</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;