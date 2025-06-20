import React from "react";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center border border-green-200">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner">
            ✓
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Thank You!
        </h2>

        <p className="text-green-600 font-semibold mb-4">
          You’ve successfully completed the interview.
        </p>

        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          We appreciate your time and effort. Our team will now review your responses.
          You will be notified via email regarding the next steps.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
