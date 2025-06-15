import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Resultspage = () => {
  const { id } = useParams(); 
  const navigate=useNavigate();

  // Dummy data
  const job = {
    id,
    title: 'Frontend Developer',
    jd: 'We are looking for a skilled frontend developer with experience in React and Tailwind CSS.',
    candidates: [
      { email: 'alice@example.com', score: 85, status: null },
      { email: 'bob@example.com', score: 72, status: null },
      { email: 'charlie@example.com', score: 90, status: null },
    ],
  };

  const [candidates, setCandidates] = useState(job.candidates);
  const [showJD, setShowJD] = useState(false);

  const handleDecision = (index, decision) => {
    const updated = [...candidates];
    updated[index].status = decision;
    setCandidates(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <button
      onClick={() => navigate('/recruiter/Dashboard')}
      className="bg-gray-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
    >
      ← Back 
    </button>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{job.title} - Interview Results</h1>
          <button
            onClick={() => setShowJD(!showJD)}
            className="text-blue-600 hover:underline text-sm"
          >
            {showJD ? 'Hide JD' : 'View JD'}
          </button>
        </div>

        {showJD && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-gray-700">
            <p>{job.jd}</p>
          </div>
        )}

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Candidate Email</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Decision</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.score}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleDecision(index, 'Accepted')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      c.status === 'Accepted'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(index, 'Rejected')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      c.status === 'Rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resultspage;
