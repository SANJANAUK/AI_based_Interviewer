import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Candidatelogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    if (!email || !otp) {
      alert('Please enter both email and OTP');
      return;
    }

    navigate('/candidate/Chatinterface');
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-400 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Candidate Login
        </h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Candidatelogin;
