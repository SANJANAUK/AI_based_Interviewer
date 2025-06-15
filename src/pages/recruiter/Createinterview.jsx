import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateInterview = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [jdFile, setJdFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 100 * 1024 * 1024) {
      setJdFile(file);
      setError('');
    } else {
      setError('File size must be less than 100MB');
      setJdFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !jdFile) {
      setError('Please fill in all required fields');
      return;
    }

    // You can use FormData here to send the PDF to backend
    alert('Interview created successfully!');
    navigate('/recruiter/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <div className="mb-4">
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
  
            ← Back 
          </button>
        </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Job Description (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <p className="text-xs text-gray-500 mt-1">Max file size: 100MB</p>
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
