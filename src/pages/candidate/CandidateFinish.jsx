import React from "react";

const CandidateFinish = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
      <div className="bg-white border border-red-200 shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center relative">
        {/* Subtle alert icon without any icon library */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner">
            !
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Interview Ended
        </h2>

        <p className="text-red-600 font-semibold mb-4">
          You ended the interview before completing all questions.
        </p>

        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          Since the interview was not completed, your submission will{" "}
          <span className="font-bold underline text-black">
            not be considered
          </span>{" "}
          for evaluation.
        </p>
      </div>
    </div>
  );
};

export default CandidateFinish;
