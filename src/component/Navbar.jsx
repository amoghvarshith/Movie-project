import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('Searching for:', query);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
      {/* Left side content */}
      <div className="flex space-x-8 items-center">
        <img 
          className="w-[70px] h-[40px]" 
          src="https://static1.bigstockphoto.com/6/1/2/large2/216975640.jpg" 
          alt="Logo" 
        />
        <Link to="/" className="text-white text-2xl">Movies</Link>
        <Link to="/Watchlist" className="text-white text-2xl">Watchlist</Link>
        <Link to="/History" className="text-white text-2xl">History</Link>
      </div>
      
      {/* Right side content (Search and Logout button) */}
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center w-72">
          {/* Search icon on the left */}
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-white text-lg" />

          {/* Search input field with dark background */}
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-10 py-2 rounded-full bg-[#1e1e1e] text-white text-center shadow-[0px_0px_10px_rgba(128,0,128,0.5),_0px_0px_20px_rgba(128,0,128,0.6)] focus:shadow-[0px_0px_15px_rgba(128,0,128,0.7),_0px_0px_30px_rgba(128,0,128,0.8)] focus:bg-[#2b2b2b] outline-none transition duration-300 ease-in-out"
            value={query}
            onChange={handleSearchChange}
          />

          {/* Arrow icon on the right */}
          <button onClick={handleSearchSubmit} className="absolute right-3 text-white text-lg">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Logout button */}
        <Link to="/login">
          <FontAwesomeIcon icon={faRightFromBracket} className="text-3xl text-white cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
