import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecruiterRegister = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirm, setconfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      alert('Please fill in all the fields');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alert('Invalid Gmail ID');
      return;
    }

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recruiter_email: email, password })
      });

      const data = await res.json();

      if (data.success) {
        alert('Registered Successfully');
        localStorage.setItem("recruiterEmail", email);
        navigate('/recruiter/Recruiterlogin');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Recruiter Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setconfirm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/recruiter/Recruiterlogin')}
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RecruiterRegister;
