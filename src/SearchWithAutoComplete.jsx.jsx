import React, { useState } from 'react';

const SearchWithAutoComplete = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);

    // Perform search and fetch autocomplete suggestions
    fetchSuggestions(value);
  };

  const fetchSuggestions = (value) => {
    // Replace this with your own logic to fetch suggestions
    // from an API or any other data source
    // For demonstration purposes, we'll use a static array of suggestions

    const staticSuggestions = [
      'apple',
      'aavash',
      'aayoush',
      'aaa',
      'aaaaa',
      'banana',
      'cherry',
      'date',
      'elderberry',
      'fig',
      'grape',
      'honeydew',
      'imbe',
      'jackfruit',
      'jackf',
      'Nepal',
      'India'
    ];

    const filteredSuggestions = staticSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <center>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
      />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      </center>
    </div>
  );
};

export default SearchWithAutoComplete;