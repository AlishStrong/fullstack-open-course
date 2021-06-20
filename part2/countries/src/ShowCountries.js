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
    toReturn = <CountryData country={filteredCountries[0]} />;
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
