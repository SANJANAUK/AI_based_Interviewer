import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 px-4">
        <h1 className=" text-4xl font-bold mb-10 text-gray-800">Welcome to AI-based Interviewer</h1>

        <div className="flex space-x-8">
        <button 
        onClick={()=>navigate('/candidate/Candidatelogin')}
        className="w-40 h-22 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition flex flex-col items-center justify-center"
        >

            <span className="text-2xl font-semibold">Candidate</span>
          <span className="mt-2 text-sm">Login & Start Interview</span>
        </button>

        <button
          onClick={() => navigate('/recruiter/Recruiterlogin')}
          className="w-40 h-22 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition flex flex-col items-center justify-center"
        >
          <span className="text-2xl font-semibold">Recruiter</span>
          <span className="mt-2 text-sm">Login & Manage Interviews</span>
        </button>
        </div>
      
    </div>
  );
}

export default Homepage
