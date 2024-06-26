import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Movies from './component/Movies';
import Watchlist from './component/Watchlist';
import History from './component/History';
import Banner from './component/Banner';

function App() {
  let [watchlist, setWatchlist] = useState([]);

  let handleAddWatchlist = (movieObj) => {
    let newWatchlist = [...watchlist, movieObj];
    localStorage.setItem('movieApp', JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
    console.log(newWatchlist);
  };

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchlist(filteredWatchList);
    console.log(filteredWatchList);

    // Add to deleted history only if it doesn't already exist
    let deletedHistory = JSON.parse(localStorage.getItem('deletedHistory')) || [];
    if (!deletedHistory.some(movie => movie.id === movieObj.id)) {
      deletedHistory = [...deletedHistory, movieObj];
      localStorage.setItem('deletedHistory', JSON.stringify(deletedHistory));
    }
  };

  useEffect(() => {
    let movieFromLocalStorage = localStorage.getItem('movieApp');
    if (!movieFromLocalStorage) {
      return;
    }
    setWatchlist(JSON.parse(movieFromLocalStorage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
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
                />
              </>
            }
          />
          <Route
            path="/Watchlist"
            element={<Watchlist watchlist={watchlist} handleRemoveFromWatchList={handleRemoveFromWatchList} setWatchlist={setWatchlist} />}
          />
          <Route
            path="/History"
            element={<History />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
