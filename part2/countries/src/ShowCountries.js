import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CountryData = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country.flag} alt={`national flag of ${country.name}`} width='100px' />
    </>
  );
}

const CapitalWeather = ({capital}) => {
  const [weatherData, setWeatherData] = useState({});
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital
  };
  
  axios.get('http://api.weatherstack.com/current', {params})
  .then(response => {
    const apiResponse = response.data;
    if (response.data.error) {
      console.error(response.data.error.info);
    } else {
      setWeatherData({
        temperature: apiResponse.temperature,
        icon: apiResponse.weather_icons[0],
        description: apiResponse.weather_descriptions[0],
        windSpeed: apiResponse.wind_speed,
        windDirection: apiResponse.wind_dir
      }); 
    }   
  }).catch(error => {
    console.error(error);
  });

  if (Object.keys(weatherData).length === 0) {
    return (<div>Could not retreive weather data for {capital}</div>);
  } else {
    (<div>
      <h2>Weather in {capital}</h2>
      <div><b>temperature:</b> {weatherData.temperature} Celcius</div>
      <img src={weatherData.icon} alt={weatherData.description + ' weather icon'} />
      <div><b>wind:</b> {weatherData.windSpeed} mph direction {weatherData.windDirection}</div>
    </div>);
  }
}

const ShowCountries = ({countries, search}) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  let toReturn = '';

  useEffect(() => {
    setFilteredCountries(countries.filter(country => {
      return country.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    }))
  }, [search, countries]);

  const showCountryData = (country) => () => setFilteredCountries([country]);

  if (filteredCountries.length === 1) {
    toReturn = (
      <>
        <CountryData country={filteredCountries[0]} />
        <CapitalWeather capital={filteredCountries[0].capital} />
      </>
    );
  } else if (filteredCountries.length <= 10) {
    toReturn = 
      <div>
        {filteredCountries.map(c => 
          <div key={c.cioc + c.name}>
            {c.name} <button onClick={showCountryData(c)}>show</button>
          </div>
        )}
      </div>;
  } else {
    toReturn = <div>Too many matches, please specify another filter</div>;
  }

  return toReturn;
}

export default ShowCountries;
