// 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateInterview = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recruiter_email = localStorage.getItem('recruiterEmail'); // must match key set on login
    if (!title || !description || !recruiter_email) {
      setError('Please fill in all fields and make sure you are logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/createInterview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interview_title: title,
          job_description: description,
          recruiter_email: recruiter_email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Interview created successfully!');
        navigate('/recruiter/dashboard');
      } else {
        setError(data.error || 'Error creating interview');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <button
          onClick={() => navigate('/recruiter/dashboard')}
          className="flex items-center text-blue-600 hover:underline text-sm mb-4"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Interview</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea
              placeholder="Write job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInterview;
