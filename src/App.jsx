import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Movies from './component/Movies';
import Watchlist from './component/Watchlist';
import History from './component/History';
import Banner from './component/Banner';
import LoginPage from './component/LoginPage';
import CreateAccountPage from './component/CreateAccountPage';
import MovieDetailPage from './component/MovieDetailPage'; // Import the MovieDetailPage component

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load the watchlist from localStorage when the app loads
    const savedWatchlist = localStorage.getItem('movieApp');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    // Save the updated watchlist to localStorage whenever it changes
    localStorage.setItem('movieApp', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddWatchlist = (movieObj) => {
    // Add a movie to the watchlist
    if (!watchlist.some(movie => movie.id === movieObj.id)) {
      const updatedWatchlist = [...watchlist, movieObj];
      setWatchlist(updatedWatchlist);
    }
  };

  const handleRemoveFromWatchList = (movieObj) => {
    // Remove a movie from the watchlist
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieObj.id);
    setWatchlist(updatedWatchlist);

    // Manage deleted history in localStorage
    let deletedHistory = JSON.parse(localStorage.getItem('deletedHistory')) || [];
    if (!deletedHistory.some(movie => movie.id === movieObj.id)) {
      deletedHistory = [...deletedHistory, movieObj];
      localStorage.setItem('deletedHistory', JSON.stringify(deletedHistory));
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          {/* Navbar is visible only when logged in */}
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
                    searchQuery={searchQuery}
                  />
                </>
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              }
            />
            <Route path="/history" element={<History />} />
            <Route
              path="/movie/:id"
              element={<MovieDetailPage />}
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
