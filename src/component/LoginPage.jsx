import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoading(true);
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.username === email && user.password === password);

    setTimeout(() => { // Simulating network request
      if (user) {
        onLogin();
        setLoading(false);
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1000); // Delay for demonstration
  };

  const handleCreateAccountClick = () => {
    navigate('/create-account');
  };

  return (
    <div
      className="relative h-screen flex justify-center items-center"
      style={{ backgroundImage: 'url(https://t3.ftcdn.net/jpg/05/12/72/20/360_F_512722061_EPiFDLgruqbfOAqOeetKGp78fNcG8mai.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-md text-white max-w-xs w-full">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 border-t-blue-500 animate-spin"></div>
          </div>
        ) : (
          <>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <input
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="block w-full p-2 mb-4 bg-red-600 rounded text-white font-semibold"
              onClick={handleLoginClick}
            >
              Sign In
            </button>
            <button 
              className="block w-full p-2 mb-4 bg-green-600 rounded text-white font-semibold"
              onClick={handleCreateAccountClick}
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
