import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex border space-x-8 items-center pl-3 py-2'>
      {showGif && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black z-50">
          <img 
            className='w-full h-full  h-[20vh]object-contain' 
            // src='https://i.gifer.com/8V9H.gif' 
            alt='Logo' 
          />
        </div>
      )}

      <img 
        className='w-[70px] h-[40px]' 
        src='https://static1.bigstockphoto.com/6/1/2/large2/216975640.jpg' 
        alt='Logo' 
      />
      

      <Link to='/' className='text-blue-800 text-2xl'>Movies</Link>
      <Link to='/Watchlist' className='text-blue-800 text-2xl'>Watchlist</Link>
      <Link to='/History' className='text-blue-800 text-2xl'>History</Link>
      

    </div>
  );
}

export default Navbar;
