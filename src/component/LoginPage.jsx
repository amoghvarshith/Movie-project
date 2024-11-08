
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      if (response.data.message === 'Success') {
        onLogin();
        setLoading(false);
        navigate('/Navbar');
      } else {
        setError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/create-account');
  };

  return (
    <div
      className="relative h-screen flex justify-center items-center"
      style={{ backgroundImage: 'url(https://t3.ftcdn.net/jpg/05/12/72/20/360_F_512722061_EPiFDLgruqbfOAqOeetKGp78fNcG8mai.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <form onSubmit={handleSubmit} className="relative z-10 bg-black bg-opacity-70 p-8 rounded-md text-white max-w-xs w-full">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 border-t-blue-500 animate-spin"></div>
          </div>
        ) : (
          <>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
            />
            <button 
              type="submit"
              className="block w-full p-2 mb-4 bg-red-600 rounded text-white font-semibold"
            >
              Sign In
            </button>
            <button 
              type="button"
              className="block w-full p-2 mb-4 bg-green-600 rounded text-white font-semibold"
              onClick={handleCreateAccountClick}
            >
              Create Account
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
