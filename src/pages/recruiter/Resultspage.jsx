import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Resultspage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [showJD, setShowJD] = useState(false);

  useEffect(() => {
    localStorage.setItem('interview_id', id);
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/interviewDetails/${id}`);
      const 
      
      
      
      Data = await res.json();
      setJobTitle(jobData.title);
      setJobDesc(jobData.jd);

      const res2 = await fetch(`http://localhost:3001/candidates/${id}`);
      const candidateData = await res2.json();
      setCandidates(candidateData.candidates || []);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleAccept = async (email) => {
    try {
      await fetch(`http://localhost:3001/candidates/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_email: email, interview_id: id }),
      });
      fetchData();
    } catch (err) {
      console.error('Accept error:', err);
    }
  };

  const handleReject = async (email) => {
    const confirmReject = window.confirm(`Do you want to reject ${email}?`);
    if (!confirmReject) return;

    try {
      await fetch(`http://localhost:3001/candidates/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_email: email, interview_id: id }),
      });
      fetchData();
    } catch (err) {
      console.error('Reject error:', err);
    }
  };

  const handleBack = () => {
    localStorage.removeItem('interview_id');
    navigate('/recruiter/Dashboard');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <button
        onClick={handleBack}
        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition mb-4"
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {jobTitle} - Interview Results
          </h1>
          <button
            onClick={() => setShowJD(!showJD)}
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            {showJD ? 'Hide JD' : 'View JD'}
          </button>
        </div>

        {showJD && (
          <div className="mb-6 p-4 bg-blue-100 rounded-lg text-blue-900">
            <p>{jobDesc}</p>
          </div>
        )}

        <table className="w-full table-auto border border-gray-200 rounded overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="p-3 border text-left">Candidate Email</th>
              <th className="p-3 border text-left">Score</th>
              <th className="p-3 border text-left">Decision</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="p-3 border">{c.candidate_email}</td>
                <td className="p-3 border">{c.score}</td>
                <td className="p-3 border space-x-2">
                  {c.is_evaluated ? (
                    <span className="text-green-600 font-semibold">Accepted</span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleAccept(c.candidate_email)}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(c.candidate_email)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </>
                  )}
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
