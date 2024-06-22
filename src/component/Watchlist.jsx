import React, { useEffect, useState } from 'react';

function Watchlist({ watchlist, handleRemoveFromWatchList }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedWatchlist, setSortedWatchlist] = useState(watchlist);

  useEffect(() => {
    setSortedWatchlist(watchlist);
  }, [watchlist]);

  const filteredWatchlist = sortedWatchlist.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortIncreasingByRating = () => {
    const sortedIncreasing = [...sortedWatchlist].sort((movieA, movieB) => movieA.vote_average - movieB.vote_average);
    setSortedWatchlist(sortedIncreasing);
  };

  const sortDecreasingByRating = () => {
    const sortedDecreasing = [...sortedWatchlist].sort((movieA, movieB) => movieB.vote_average - movieA.vote_average);
    setSortedWatchlist(sortedDecreasing);
  };

  const sortIncreasingByPopularity = () => {
    const sortedIncreasing = [...sortedWatchlist].sort((movieA, movieB) => movieA.popularity - movieB.popularity);
    setSortedWatchlist(sortedIncreasing);
  };

  const sortDecreasingByPopularity = () => {
    const sortedDecreasing = [...sortedWatchlist].sort((movieA, movieB) => movieB.popularity - movieA.popularity);
    setSortedWatchlist(sortedDecreasing);
  };

  return (
    <>
      <div className='flex justify-center flex-wrap m-4'>
        <div className='flex justify-center items-center h-[2rem] w-[6rem] rounded-xl text-white bg-blue-300 font-bold mx-4'>
          Actions
        </div>
        <div className='flex justify-center items-center h-[2rem] w-[6rem] rounded-xl text-white bg-gray-300 font-bold'>
          Actions
        </div>
      </div>
      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Search Movies'
          className='h-[2rem] w-[10rem] bg-gray-200 px-4'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
        <table className='w-full text-center text-gray-290'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th>
                <div className='flex items-center justify-center'>
                  <div onClick={sortIncreasingByRating} className='p-2 cursor-pointer'>
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className='p-2'>Ratings</div>
                  <div onClick={sortDecreasingByRating} className='p-2 cursor-pointer'>
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th>
                <div className='flex items-center justify-center'>
                  <div onClick={sortIncreasingByPopularity} className='p-2 cursor-pointer'>
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className='p-2'>Popularity</div>
                  <div onClick={sortDecreasingByPopularity} className='p-2 cursor-pointer'>
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatchlist.map((movieObj) => (
              <tr className='border-b-2' key={movieObj.id}>
                <td className='px-4 py-4 flex items-center'>
                  <img
                    className='h-[6rem] w-[10rem]'
                    src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                    alt={movieObj.title}
                  />
                  <div className='mx-10'>{movieObj.title}</div>
                </td>
                <td>{movieObj.vote_average}</td>
                <td>{movieObj.popularity}</td>
                <td>Action</td>
                <td
                  className='text-red-800 cursor-pointer'
                  onClick={() => handleRemoveFromWatchList(movieObj)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
