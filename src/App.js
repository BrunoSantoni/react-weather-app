import React, { useState } from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/form.component';
import Weather from './components/weather.component';

const API_key = '503a991604d9ebc333ffdce649d2b8e4';

const App = () => {
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [icon, setIcon] = useState('');
  const [temperature, setTemperature] = useState('');
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');

  const weatherIcon = {
    Thunderstorm: 'wi-thunderstorm',
    Rain: 'wi-storm-showers',
    Clear: 'wi-day-sunny',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Drizzle: 'wi-sleet',
    Clouds: 'wi-day-fog'
  };

  const getWeather = async (e) => {
    e.preventDefault();
    
    /* Picking the values from the form */
    const cityInput = e.target.elements.city.value;
    const countryInput = e.target.elements.country.value;

    if(cityInput && countryInput) {
      const apiCall =
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput},${countryInput}&appid=${API_key}`);

    const res = await apiCall.json(); /* Converting the request to JSON */

    setCity(`${res.name}, ${res.sys.country}`);
    setDescription(res.weather[0].main);
    setTemperature(Math.floor(res.main.temp - 273.15));
    /* Floor returns the lowest integer number */
    /* O - 273.15 was to convert kelvin to celsius */
    setMinTemperature(Math.floor(res.main.temp_min - 273.15));
    setMaxTemperature(Math.floor(res.main.temp_max - 273.15));
    setError(false);

    getWeatherIcon(weatherIcon, res.weather[0].id);
    }
    else {
      setError(true);
    }
  };

  const getWeatherIcon = (icons, rangeId) => {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        setIcon(weatherIcon.Thunderstorm);
        break;

      case rangeId >= 300 && rangeId <= 321:
        setIcon(weatherIcon.Drizzle);
        break;

      case rangeId >= 500 && rangeId <= 531:
        setIcon(weatherIcon.Rain);
        break;

      case rangeId >= 600 && rangeId <= 622:
        setIcon(weatherIcon.Snow);
        break;
      
      case rangeId >= 701 && rangeId <= 781:
        setIcon(weatherIcon.Atmosphere);
        break;

      case rangeId === 800:
        setIcon(weatherIcon.Clear);
        break;

      default:
        setIcon(weatherIcon.Clouds);
        break;
    }
  }
  
  return (
    <div className="App">
      <Form loadWeather={getWeather} error={error}/>
      <Weather
      city={city} description={description} temperature={temperature}
      maxTemperature={maxTemperature} minTemperature={minTemperature} icon={icon} />
    </div>
  );
}

export default App;
