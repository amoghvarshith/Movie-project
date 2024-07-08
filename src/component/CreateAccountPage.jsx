import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccountPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  const handleCreateAccount = () => {
    if (password !== reenterPassword) {
      setError('Passwords do not match');
      return;
    }
    if (captcha !== captchaText) {
      setError('Invalid CAPTCHA');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.some(user => user.username === username);

    if (userExists) {
      setError('User already exists');
    } else {
      const newUser = { username, password, mobile };
      localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
      setSuccessMessage('Account created successfully! You can now log in.');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 1000); // Redirect to login page after 2 seconds
    }
  };

  return (
    <div
      className="relative h-screen flex justify-center items-center"
      style={{ backgroundImage: 'url(https://t3.ftcdn.net/jpg/05/12/72/20/360_F_512722061_EPiFDLgruqbfOAqOeetKGp78fNcG8mai.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-md text-white max-w-xs w-full">
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {successMessage && (
          <div className="mb-4 text-green-600 transition-all duration-500 transform translate-x-full">
            {successMessage}
          </div>
        )}
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
        <input
          type="password"
          placeholder="Re-enter Password"
          value={reenterPassword}
          onChange={(e) => setReenterPassword(e.target.value)}
          className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
        />
        <div className="flex items-center mb-4">
          <span className="mr-4 bg-gray-800 p-2 rounded">{captchaText}</span>
          <button
            className="p-2 bg-blue-600 rounded text-white"
            onClick={() => setCaptchaText(generateCaptcha())}
          >
            Refresh
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
        />
        <button 
          className="block w-full p-2 mb-4 bg-green-600 rounded text-white font-semibold"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default CreateAccountPage;
