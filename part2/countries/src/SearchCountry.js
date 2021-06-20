import React from 'react';

const SearchCountry = ({search, searchChange}) => {
  return (
    <div>
      find countries <input value={search} onChange={searchChange} />
    </div>
  );
};

export default SearchCountry;
