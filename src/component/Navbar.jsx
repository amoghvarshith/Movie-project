import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-2'>
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
