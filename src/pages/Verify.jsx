// src/pages/Verify.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const Verify = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const verifyEmail = async () => {
    const url = window.location.href;
    let email = localStorage.getItem("emailForSignIn");

    if (!email) {
      const promptEmail = window.prompt("Please provide your Gmail for confirmation:");
      if (promptEmail) {
        localStorage.setItem("emailForSignIn", promptEmail);
        email = promptEmail; // ✅ Update the `email` variable
      } else {
        alert("Email is required for verification.");
        setLoading(false);
        return;
      }
    }

    if (isSignInWithEmailLink(auth, url)) {
      try {
        const result = await signInWithEmailLink(auth, email, url); // ✅ email is now guaranteed
        localStorage.setItem("candidate_email", result.user.email);
        console.log("candidate_email", result.user.email);
        alert("✅ Email verified successfully!");
        navigate("/candidate/CandidatesRules");
      } catch (err) {
        console.error("❌ Verification failed:", err);
        alert("Verification failed. Try again or contact support.");
      }
    }

    setLoading(false);
  };

  verifyEmail();
}, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {loading ? (
          <p className="text-lg">Verifying your email, please wait...</p>
        ) : (
          <p className="text-lg text-red-500">Verification failed or expired link.</p>
        )}
      </div>
    </div>
  );
};

export default Verify;
