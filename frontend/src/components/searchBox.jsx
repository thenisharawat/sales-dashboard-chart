// searchBox.jsx
import React from "react";

const SearchBox = ({ onSearch, searchTerm }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <form className="search-container">
      <h4>Search: </h4>
      <input
        type="text"
        placeholder="Title / Description / Price"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default SearchBox;
