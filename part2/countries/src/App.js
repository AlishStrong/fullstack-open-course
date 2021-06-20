import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchCountry from './SearchCountry';
import ShowCountries from './ShowCountries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const getAllCountriesHook = () => {
      axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(response => setCountries(response.data))
        .catch(console.error);
  }

  useEffect(getAllCountriesHook, []);

  const searchChange = event => setSearch(event.target.value);

  return (
    <div>
      <SearchCountry search={search} searchChange={searchChange} />
      {search.length > 0 && <ShowCountries countries={countries} search={search} />}
    </div>
  );
}

export default App;
