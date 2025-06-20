import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('recruiterEmail');
    if (!email) {
      console.warn('No recruiterEmail found in localStorage');
      navigate('/');
      return;
    }

    setRecruiterEmail(email);

    const fetchInterviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/getInterviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recruiter_email: email }),
        });

        const data = await response.json();
        console.log('Fetched interview data:', data);

        if (response.ok && Array.isArray(data.interviews)) {
          setInterviews(data.interviews);
        } else {
          console.error('Error fetching interviews:', data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchInterviews();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">{recruiterEmail}</p>
        </div>
        <button
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem('recruiterEmail');
            navigate('/');
          }}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>

      {/* Create Interview Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/recruiter/Createinterview')}
          className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-md shadow hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} className="mr-2" />
          Create Interview
        </button>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Interview Roles</h2>

      {/* Interviews List */}
      <div className="space-y-6 overflow-y-auto max-h-[70vh]">
        {interviews.length === 0 ? (
          <div className="mt-20 text-center text-gray-700 text-lg">
            No interviews created yet. Use the button above to get started.
          </div>
        ) : (
          interviews.map((interview) => (
            <div
              key={interview.interview_id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {interview.interview_title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 break-words">
                {interview.interview_link || 'Link not available'}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(`/recruiter/Resultspage/${interview.interview_id}`)}
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  View Results
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(interview.interview_link || '')}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
