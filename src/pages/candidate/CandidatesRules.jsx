import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidatesRules = () => {
  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {
    const interview_id = localStorage.getItem("interview_id");

    if (!interview_id) {
      alert("No interview ID found. Please login again.");
      return;
    }

    axios.get(`http://localhost:3001/interviewDetails/${interview_id}`)
      .then((res) => {
        setInterviewData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching interview details:", err);
        alert("Could not fetch interview details.");
      });
  }, []);

  useEffect(() => {
    if (interviewData) {
      console.log("✅ Loaded interviewData:", interviewData);
    }
  }, [interviewData]);

  const startInterview = () => {
    if (!interviewData) return;

    const interview_id = localStorage.getItem("interview_id");
    const candidate_email = localStorage.getItem("candidate_email");

    const { interview_title, job_description } = interviewData;

    const queryParams = new URLSearchParams({
      interview_id,
      candidate_email,
      interview_title,
      job_description,
    }).toString();

    window.location.href = `http://localhost:8501/?${queryParams}`;
  };

  if (!interviewData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-700 text-lg">
        Loading interview details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Interview Guidelines
        </h2>

        <div className="mb-6">
          <p className="text-lg text-blue-700 mb-2">
            <strong>Role:</strong> {interviewData.interview_title}
          </p>
          <p className="text-blue-700 whitespace-pre-line">
            <strong>Description:</strong> {interviewData.job_description}
          </p>
        </div>

        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
          <li>This interview consists of <strong>5 automated questions</strong>.</li>
          <li>Each answer should be clear, concise, and relevant.</li>
          <li>You may exit the interview anytime, but it will only be <strong>considered valid</strong> if you complete all 5 questions.</li>
          <li>Incomplete interviews will not be scored.</li>
          <li>Make sure your internet connection is stable.</li>
        </ul>

        <div className="text-center text-blue-700 font-medium mb-6">
          We wish you the best of luck in your interview!
        </div>

        <button
          onClick={startInterview}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
        >
          Start the Interview
        </button>
      </div>
    </div>
  );
};

export default CandidatesRules;
