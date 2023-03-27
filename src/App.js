import React, { useState, useRef, useEffect } from "react";
import { Page_Home } from './components/Home';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);

  if ('geolocation' in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(async (position) => {
      await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&forecast_days=8&timezone=Europe%2FBerlin`)
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((err) => console.log('Error =>', err));

      const ipInfoRes = await fetch("https://ipinfo.io/json?token=d9a9368faea8a6");
      const ipInfo = await ipInfoRes.json();
      setLocationData({ city: ipInfo.city, country: ipInfo.country });
    });
  } else {
    /* geolocation IS NOT available */
    alert('Failed to get current location. Please choose one instead.')
  }

  return (
    <Page_Home weatherData={weatherData} locationData={locationData} />
  );
}

export default App;
