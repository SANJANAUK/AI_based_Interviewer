import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Recruiterlogin = () => {
const navigate=useNavigate();
const [email,setemail]=useState('');
const [password, setPassword] = useState('');

const handlesubmit=(e)=>{
    e.preventDefault(); // prevents default behvaior i,e loading of the page 

    if(!email || !password){
        alert('Please fill in both email and password ');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const existingRecruiters = ['abc@gmail.com', 'pqr@gmail.com'];
    if (!existingRecruiters.includes(email)) {
      alert('Email not found. Are you a new user? Please register first.');
      return;
    }

        alert('Login successful!')
         navigate('/recruiter/Dashboard');
}

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-400 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Recruiter Login</h2>

        <form onSubmit={handlesubmit} className='space-y-4'>
            <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // required
          />

           <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // required
          />

          <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          New recruiter?{' '}
          <button
            onClick={() => navigate('/recruiter/Register')}
            className="text-blue-600 hover:underline"
          >
            Create an account
          </button>
        </p>
        </div>
         </div>
  )
}

export default Recruiterlogin
