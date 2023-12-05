import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/search?query=${query}`);
        const results = response.data;
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query.trim() !== '') {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for users or businesses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((result) => (
            <div key={result.id}>
              {/* Use Link to navigate to the respective user or business page */}
              <Link
                to={result.type === 'user' ? `/users/${result.id}` : `/businesses/${result.id}`}
              >
                {result.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
