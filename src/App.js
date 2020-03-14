import React, { useState } from 'react';
const weatherAPI = {
  key: "e3b5964bae9f2313e54784bed583ace4",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${weatherAPI.base}weather?q=${query}&units=metric&APPID=${weatherAPI.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('')
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < -5) ? 'app cold'
      : (weather.main.temp < 10) ? 'app zero'
        : (weather.main.temp < 20) ? 'app nice'
          : (weather.main.temp >= 20) ? 'app warm'
            : 'app') : 'app'}>
      <main>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (<div className="title">
          Check the Weather!
        </div>)}
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
      </main>
    </div>

  );
}

export default App;
