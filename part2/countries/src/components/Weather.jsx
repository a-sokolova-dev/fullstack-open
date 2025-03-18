import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!capital) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [capital, api_key]);

  if (!weather) return <p>Loading weather...</p>;

  const weatherData = weather.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Condition: {weatherData.description}</p>
      <img src={iconUrl} alt={weatherData.description} />
    </div>
  );
};

export default Weather;
