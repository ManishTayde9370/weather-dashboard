import React from 'react';
import '../styles/ForecastCard.css';

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  // Group by day (3-hour intervals from API)
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get next 5 days (excluding today if you want)
  const nextFiveDays = Object.entries(dailyForecasts).slice(0, 5);

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {nextFiveDays.map(([date, dayData]) => {
          const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const avgTemp = Math.round(dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length);
          const icon = dayData[0].weather[0].icon;

          return (
            <div key={date} className="forecast-day">
              <div className="forecast-date">{day}</div>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
                alt={dayData[0].weather[0].description}
                className="forecast-icon"
              />
              <div className="forecast-temp">{avgTemp}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;