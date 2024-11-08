import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Movies from './component/Movies';
import Watchlist from './component/Watchlist';
import History from './component/History';
import Banner from './component/Banner';
import LoginPage from './component/LoginPage';
import CreateAccountPage from './component/CreateAccountPage';

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  const handleAddWatchlist = (movieObj) => {
    const newWatchlist = [...watchlist, movieObj];
    localStorage.setItem('movieApp', JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
    console.log(newWatchlist);
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchList = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchlist(filteredWatchList);
    console.log(filteredWatchList);

    let deletedHistory = JSON.parse(localStorage.getItem('deletedHistory')) || [];
    if (!deletedHistory.some((movie) => movie.id === movieObj.id)) {
      deletedHistory = [...deletedHistory, movieObj];
      localStorage.setItem('deletedHistory', JSON.stringify(deletedHistory));
    }
  };

  useEffect(() => {
    const movieFromLocalStorage = localStorage.getItem('movieApp');
    if (movieFromLocalStorage) {
      setWatchlist(JSON.parse(movieFromLocalStorage));
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          {/* Pass setSearchQuery to Navbar */}
          <Navbar setSearchQuery={setSearchQuery} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <Movies
                    handleAddWatchlist={handleAddWatchlist}
                    handleRemoveFromWatchList={handleRemoveFromWatchList}
                    watchlist={watchlist}
                    searchQuery={searchQuery} // Pass searchQuery to Movies
                  />
                </>
              }
            />
            <Route
              path="/Watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  setWatchlist={setWatchlist}
                />
              }
            />
            <Route
              path="/History"
              element={<History />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
