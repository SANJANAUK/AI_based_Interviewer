import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const interviews = [
    { title: 'Frontend Developer', date: '2025-06-05', id: '123' },
    { title: 'Backend Engineer', date: '2025-05-28', id: '456' },
    { title: 'Fullstack Dev', date: '2025-04-10', id: '789' },
    { title: 'Data Scientist', date: '2025-03-22', id: '101' },
    { title: 'ML Engineer', date: '2025-02-15', id: '202' },
     { title: 'ML Engineer', date: '2025-02-15', id: '203' },
      { title: 'ML Engineer', date: '2025-02-15', id: '204' },
       { title: 'ML Engineer', date: '2025-02-15', id: '205' },
        { title: 'ML Engineer', date: '2025-02-15', id: '206' },
  ];

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Recruiter 👋
        </h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={() => navigate('/')}
        >
          <LogOut size={16} className="inline mr-2" />
          Logout
        </button>
      </div>

      {/* Create Interview Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/recruiter/Createinterview')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} className="mr-2" />
          Create Interview
        </button>
      </div>

      {/* Section Heading */}
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

      {/* Horizontal Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="min-w-[250px] bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex-shrink-0"
          >
            <h3 className="text-lg font-semibold text-gray-800">{interview.title}</h3>
            <p className="text-sm text-gray-500 mb-4">Created on {interview.date}</p>
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/recruiter/Resultspage/${interview.id}`)}
                className="text-blue-600 hover:underline text-sm"
              >
                View Results
              </button>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(`https://yourapp.com/interview/${interview.id}`)
                }
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hide scrollbar (optional global CSS)
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style> */}
    </div>
  );
};

export default Dashboard;
