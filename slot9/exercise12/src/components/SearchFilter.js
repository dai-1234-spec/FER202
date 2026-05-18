import React, { useState } from 'react';

function SearchFilter() {
  const [searchInput, setSearchInput] = useState('');
  const items = ["fer202", "swp391", "swr302", "swt301"];

  const filteredItems = items.filter(
    (item) => item.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="text-center">
      <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Searching..."/>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFilter;