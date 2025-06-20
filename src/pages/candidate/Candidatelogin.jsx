import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from 'firebase/auth';

const Candidatelogin = () => {
  const { id: interview_id } = useParams();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (interview_id) {
      localStorage.setItem('interview_id', interview_id);
      console.log('Interview ID stored in localStorage:', interview_id);
    }
  }, [interview_id]);

  const handleVerify = async (e) => {
    e.preventDefault();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/checkCandidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate_email: email, interview_id }),
      });

      const data = await response.json();

      if (data.exists) {
        alert("Candidate has already taken the interview.");
        return;
      }

      localStorage.setItem("candidate_email", email);

      const actionCodeSettings = {
        url: 'http://localhost:5173/verify',
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      alert("Verification link sent! Check your Gmail inbox.");
    } catch (err) {
      console.error("Error verifying candidate:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Candidate Login
        </h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your Gmail"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Verification Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Candidatelogin;
