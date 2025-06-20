import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alert('Invalid Gmail ID');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recruiter_email: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.setItem("recruiterEmail", email);
        navigate('/recruiter/Dashboard');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Recruiter Login
        </h2>

        <form onSubmit={handlesubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Gmail ID"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-600">
          New recruiter?{' '}
          <button
            onClick={() => navigate('/recruiter/RecruiterRegister')}
            className="text-blue-600 font-medium hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;
