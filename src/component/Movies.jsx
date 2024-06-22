import React, { useEffect, useState } from 'react'
import MoiveCard from './MoiveCard'
import axios from 'axios'
import Pagination from './Pagination'

function Movies({ handleAddWatchlist, handleRemoveFromWatchList, watchlist }) {

  const [movies, setmovies] = useState([])
  const [pageNo, setpageNo] = useState(1)


  const handlePrev = () => {
    if (pageNo == 1) {
      setpageNo(pageNo)
    }
    else {

      setpageNo(pageNo - 1)
    }
  }


  const handleNext = () => {
    setpageNo(pageNo + 1)
  }

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=81f7a245b4af75d9aaad5533ec062952&language=en-US&page=${pageNo}`).then(function (res) {
      console.log(res.data.results)
      setmovies(res.data.results)
    })
  }, [pageNo])


  return (
    <div>
      <div className='text-2xl m-5 font-bold text-center'>
        Trending Moives
      </div>

      <div className='flex flex-row flex-wrap justify-around gap-2'>
        {movies.map((movieObj) => {
          return <MoiveCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddWatchlist={handleAddWatchlist} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist} />
        })}

      </div>
      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  )
}

export default Movies

// https://api.themoviedb.org/3/movie/popular?api_key=81f7a245b4af75d9aaad5533ec062952&language=en-US&page=2

