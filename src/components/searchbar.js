// SearchBar.js
import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    // Call the onSearch callback passed from parent component
    onSearch(value);
  };

  return (
    <TextField
      label="Search..."
      variant="outlined"
      size="small"
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
    />
  );
};

export default SearchBar;
