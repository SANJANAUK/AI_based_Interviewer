import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('recruiterEmail');
    if (!email) {
      console.warn('No recruiterEmail found in localStorage');
      return;
    }

    setRecruiterEmail(email); // Store for welcome message

    const fetchInterviews = async () => {
      try {
        const response = await fetch(`http://localhost:3001/interviews/${email}`);
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
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back! {recruiterEmail}
        </h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem('recruiterEmail');
            navigate('/');
          }}
        >
          <LogOut size={16} className="inline mr-2" />
          Logout
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/recruiter/Createinterview')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} className="mr-2" />
          Create Interview
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Interview Roles</h2>
        <div className="space-x-2">
          <button
            onClick={() => scroll('left')}
            className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {interviews.length === 0 ? (
        <p className="text-center text-gray-700 text-lg mt-8">
          No Interviews Created Yet? Click on Create New Interview
        </p>
      ) : (
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {interviews.map((interview) => (
            <div
              key={interview.interview_id}
              className="min-w-[250px] bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex-shrink-0"
            >
              <h3 className="text-lg font-semibold text-gray-800">{interview.interview_title}</h3>
              <p className="text-sm text-gray-600 mb-4 break-words">{interview.interview_link}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/recruiter/Resultspage/${interview.interview_id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Results
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(interview.interview_link)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
